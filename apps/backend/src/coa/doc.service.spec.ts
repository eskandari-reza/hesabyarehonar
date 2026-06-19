import { Test, TestingModule } from '@nestjs/testing';
import { DocService } from './doc.service';
import { DataSourceManager } from '../database/data-source-manager.service';
import { DocMaster } from '../database/entities/financial/doc-master.entity';
import { DocDetail } from '../database/entities/financial/doc-detail.entity';
import { DocDesc } from '../database/entities/financial/doc-desc.entity';
import { DataSource, Repository, EntityManager } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateDocMasterDto, DocStatusUpdateDto } from './dto/doc-master.dto';

describe('DocService', () => {
  let service: DocService;
  let mockDataSourceManager: jest.Mocked<DataSourceManager>;
  let mockDataSource: jest.Mocked<DataSource>;
  let mockMasterRepo: jest.Mocked<Repository<DocMaster>>;
  let mockDetailRepo: jest.Mocked<Repository<DocDetail>>;
  let mockDescRepo: jest.Mocked<Repository<DocDesc>>;
  let mockEntityManager: jest.Mocked<EntityManager>;

  // ─── helper: detail object ────────────────────────────────────────────────
  const makeDetail = (fields: {
    coaId: number;
    debit: number;
    credit: number;
    desc?: string;
  }): any => ({
    docType: '1',
    coaId: fields.coaId,
    debit: fields.debit,
    credit: fields.credit,
    desc: fields.desc ?? '',
  });

  // ─── helper: CreateDocMasterDto ───────────────────────────────────────────
  const makeDto = (overrides: Partial<CreateDocMasterDto> = {}): CreateDocMasterDto => ({
    serial: 100,
    date: new Date('2024-03-20'),
    tarikh: '1403/01/01',
    docType: '1',
    refrens: 0,
    taxOk: false,
    desc: 'Test document',
    modDesc: '',
    issuetype: 1,
    cui: 1,
    details: [],
    ...overrides,
  });

  // ─── helper: DocStatusUpdateDto ───────────────────────────────────────────
  const makeStatusDto = (status: number): DocStatusUpdateDto => ({
    status,
    signature: 0,
  });

  // ─── helper: queryBuilder با همه متدهای لازم ──────────────────────────────
  const makeQueryBuilder = (rows: any[] = []) => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue(rows),
    getManyAndCount: jest.fn().mockResolvedValue([rows, rows.length]),
    getRawMany: jest.fn().mockResolvedValue(rows),
    getOne: jest.fn().mockResolvedValue(rows[0] ?? null),
    getCount: jest.fn().mockResolvedValue(rows.length),
  });

  // ─── helper: یه master mock کامل برای create/update ──────────────────────
  const makeSavedMaster = (id: number, overrides: any = {}): DocMaster => ({
    id,
    serial: 100,
    date: new Date(),
    tarikh: '1403/01/01',
    docType: '1',
    refrens: 0,
    taxOk: false,
    dtotal: 0,
    ctotal: 0,
    desc: 'Test document',
    modDesc: '',
    issuetype: 1,
    status: 0,
    signature: 0,
    cui: 1,
    cdt: new Date(),
    del: false,
    ...overrides,
  } as DocMaster);

  beforeEach(async () => {
    // ─── mockMasterRepo داخل transaction ────────────────────────────────────
    // service در create/update از manager.getRepository(DocMaster).save() استفاده می‌کنه
    // پس باید mockMasterRepo.save رو mock کنیم که از manager.getRepository برمی‌گرده
    mockMasterRepo = {
      create: jest.fn(),
      save: jest.fn().mockResolvedValue(makeSavedMaster(1)),
      findOne: jest.fn(),
      createQueryBuilder: jest.fn(),
      update: jest.fn(),
    } as any;

    mockDetailRepo = {
      save: jest.fn().mockResolvedValue([] as any),
      find: jest.fn().mockResolvedValue([] as any),
      delete: jest.fn().mockResolvedValue({ affected: 0 }),
      update: jest.fn().mockResolvedValue({ affected: 0 }),
      createQueryBuilder: jest.fn(),
    } as any;

    mockDescRepo = {
      find: jest.fn().mockResolvedValue([] as any),
      createQueryBuilder: jest.fn(),
    } as any;

    mockEntityManager = {
      getRepository: jest.fn((entity) => {
        if (entity === DocMaster) return mockMasterRepo;
        if (entity === DocDetail) return mockDetailRepo;
        if (entity === DocDesc) return mockDescRepo;
      }),
    } as any;

    mockDataSource = {
      getRepository: jest.fn((entity) => {
        if (entity === DocMaster) return mockMasterRepo;
        if (entity === DocDetail) return mockDetailRepo;
        if (entity === DocDesc) return mockDescRepo;
      }),
      transaction: jest.fn(async (cb) => cb(mockEntityManager)),
    } as any;

    mockDataSourceManager = {
      getDataSource: jest.fn().mockResolvedValue(mockDataSource),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocService,
        {
          provide: DataSourceManager,
          useValue: mockDataSourceManager,
        },
      ],
    }).compile();

    service = module.get<DocService>(DocService);
  });

  afterEach(() => jest.clearAllMocks());

  // ═══════════════════════════════════════════════════════════════════════════
  describe('create', () => {
    it('should create a document with balanced debits and credits', async () => {
      const year = '1403';
      const userId = 1;
      const createDto = makeDto({
        details: [
          makeDetail({ coaId: 1, debit: 1000, credit: 0,    desc: 'Debit entry' }),
          makeDetail({ coaId: 2, debit: 0,    credit: 1000, desc: 'Credit entry' }),
        ],
      });

      const savedMaster = makeSavedMaster(1, { dtotal: 1000, ctotal: 1000 });
      // FIX: mockMasterRepo از manager.getRepository برمی‌گرده
      // service: masterRepo.create() سپس masterRepo.save()
      mockMasterRepo.create.mockReturnValue(savedMaster);
      mockMasterRepo.save.mockResolvedValue(savedMaster);
      mockDetailRepo.save.mockResolvedValue([] as any);

      const result = await service.create(year, createDto, userId);

      expect(mockDataSourceManager.getDataSource).toHaveBeenCalledWith(year);
      expect(mockDataSource.transaction).toHaveBeenCalled();
      expect(result).toHaveProperty('id', 1);
      expect(result.dtotal).toBe(1000);
      expect(result.ctotal).toBe(1000);
    });

    it('should throw BadRequestException for unbalanced document', async () => {
      const year = '1403';
      const userId = 1;
      const createDto = makeDto({
        serial: 101,
        details: [
          makeDetail({ coaId: 1, debit: 1000, credit: 0,   desc: 'Debit entry' }),
          makeDetail({ coaId: 2, debit: 0,    credit: 500, desc: 'Credit entry' }),
        ],
      });

      // service قبل از transaction چک می‌کنه، پس نیازی به mock نیست
      await expect(service.create(year, createDto, userId)).rejects.toThrow(BadRequestException);
    });

    it('should accept balanced document within tolerance (0.001)', async () => {
      const year = '1403';
      const userId = 1;
      const createDto = makeDto({
        serial: 102,
        details: [
          makeDetail({ coaId: 1, debit: 1000.0005, credit: 0,         desc: 'Debit entry' }),
          makeDetail({ coaId: 2, debit: 0,         credit: 1000.0001, desc: 'Credit entry' }),
        ],
      });

      const savedMaster = makeSavedMaster(2);
      mockMasterRepo.create.mockReturnValue(savedMaster);
      mockMasterRepo.save.mockResolvedValue(savedMaster);
      mockDetailRepo.save.mockResolvedValue([] as any);

      const result = await service.create(year, createDto, userId);

      expect(result).toHaveProperty('id', 2);
      expect(mockDataSource.transaction).toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  describe('update', () => {
    it('should update an existing document with balanced data', async () => {
      const year = '1403';
      const docId = 1;
      const userId = 1;
      const updateDto = makeDto({
        serial: 103,
        details: [
          makeDetail({ coaId: 1, debit: 2000, credit: 0,    desc: 'Updated debit' }),
          makeDetail({ coaId: 2, debit: 0,    credit: 2000, desc: 'Updated credit' }),
        ],
      });

      const existingMaster = makeSavedMaster(docId);
      const savedMaster = makeSavedMaster(docId, { dtotal: 2000, ctotal: 2000 });

      // service: masterRepo.findOne() سپس masterRepo.save()
      mockMasterRepo.findOne.mockResolvedValue(existingMaster);
      mockMasterRepo.save.mockResolvedValue(savedMaster);
      mockDetailRepo.delete.mockResolvedValue({ affected: 0 } as any);
      mockDetailRepo.save.mockResolvedValue([] as any);
      mockDetailRepo.find.mockResolvedValue([] as any);

      const result = await service.update(year, docId, updateDto, userId);

      expect(mockDataSourceManager.getDataSource).toHaveBeenCalledWith(year);
      expect(mockDataSource.transaction).toHaveBeenCalled();
      expect(result).toHaveProperty('id', docId);
    });

    it('should throw NotFoundException for non-existent document', async () => {
      const year = '1403';
      const docId = 999;
      const userId = 1;
      const updateDto = makeDto({ serial: 104 });

      mockMasterRepo.findOne.mockResolvedValue(null);

      await expect(service.update(year, docId, updateDto, userId)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for unbalanced update', async () => {
      const year = '1403';
      const docId = 1;
      const userId = 1;
      const updateDto = makeDto({
        serial: 105,
        details: [
          makeDetail({ coaId: 1, debit: 1500, credit: 0,    desc: 'Debit' }),
          makeDetail({ coaId: 2, debit: 0,    credit: 1000, desc: 'Credit' }),
        ],
      });

      // service قبل از transaction چک می‌کنه
      await expect(service.update(year, docId, updateDto, userId)).rejects.toThrow(BadRequestException);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  describe('findOne', () => {
    it('should return a document with its details', async () => {
      const year = '1403';
      const docId = 1;

      const mockMaster = makeSavedMaster(docId, { dtotal: 1000, ctotal: 1000 });
      const mockDetails = [
        { id: 1, masterId: docId, coaId: 1, debit: 1000, credit: 0,    desc: 'Detail 1', del: false },
        { id: 2, masterId: docId, coaId: 2, debit: 0,    credit: 1000, desc: 'Detail 2', del: false },
      ];

      mockMasterRepo.findOne.mockResolvedValue(mockMaster);
      mockDetailRepo.find.mockResolvedValue(mockDetails as any);

      const result = await service.findOne(year, docId);

      expect(mockDataSourceManager.getDataSource).toHaveBeenCalledWith(year);
      expect(mockMasterRepo.findOne).toHaveBeenCalledWith({ where: { id: docId, del: false } });
      expect(mockDetailRepo.find).toHaveBeenCalledWith({
        where: { masterId: docId, del: false },
        order: { id: 'ASC' },
      });
      expect(result).toHaveProperty('id', docId);
      expect(result.details).toHaveLength(2);
    });

    it('should throw NotFoundException for non-existent document', async () => {
      const year = '1403';
      mockMasterRepo.findOne.mockResolvedValue(null);

      await expect(service.findOne(year, 999)).rejects.toThrow(NotFoundException);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  describe('findAll', () => {
    it('should return documents list', async () => {
      const year = '1403';
      const mockDocuments = [
        makeSavedMaster(1, { desc: 'Doc 1' }),
        makeSavedMaster(2, { desc: 'Doc 2' }),
      ];
      mockMasterRepo.createQueryBuilder.mockReturnValue(makeQueryBuilder(mockDocuments) as any);

      const filter = { limit: 10, offset: 0 };
      const result = await service.findAll(year, filter);

      expect(mockDataSourceManager.getDataSource).toHaveBeenCalledWith(year);
      expect(result).toHaveLength(2);
    });

    it('should apply date range filters', async () => {
      const year = '1403';
      // FIX: service از 'doc.tarikh' استفاده می‌کنه نه 'master.date'
      const filter = { limit: 10, offset: 0, fromDate: '14030101', toDate: '14030131' };
      const qb = makeQueryBuilder();
      mockMasterRepo.createQueryBuilder.mockReturnValue(qb as any);

      await service.findAll(year, filter);

      expect(qb.andWhere).toHaveBeenCalledWith('doc.tarikh >= :fromDate', { fromDate: filter.fromDate });
      expect(qb.andWhere).toHaveBeenCalledWith('doc.tarikh <= :toDate',   { toDate: filter.toDate });
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  describe('remove', () => {
    it('should soft delete a document and its details', async () => {
      const year = '1403';
      const docId = 1;
      const master = makeSavedMaster(docId, { del: false });
      mockMasterRepo.findOne.mockResolvedValue(master);
      mockMasterRepo.save.mockResolvedValue({ ...master, del: true } as any);
      mockDetailRepo.update.mockResolvedValue({ affected: 0 } as any);

      await service.remove(year, docId, 1);

      expect(mockDataSourceManager.getDataSource).toHaveBeenCalledWith(year);
      expect(mockMasterRepo.findOne).toHaveBeenCalledWith({ where: { id: docId } });
      expect(mockDataSource.transaction).toHaveBeenCalled();
    });

    it('should throw NotFoundException for non-existent document', async () => {
      const year = '1403';
      mockMasterRepo.findOne.mockResolvedValue(null);

      await expect(service.remove(year, 999, 1)).rejects.toThrow(NotFoundException);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  describe('cancel', () => {
    it('should cancel document details', async () => {
      const year = '1403';
      const docId = 1;
      const userId = 1;
      // FIX: service مستقیم از ds.getRepository(DocDetail).update() استفاده می‌کنه
      // هیچ findOne و transaction نداره
      mockDetailRepo.update.mockResolvedValue({ affected: 2 } as any);

      await service.cancel(year, docId, userId);

      expect(mockDataSourceManager.getDataSource).toHaveBeenCalledWith(year);
      expect(mockDetailRepo.update).toHaveBeenCalledWith(
        { masterId: docId },
        { cancel: true, cancelui: userId, canceldt: expect.any(Date) },
      );
    });

    it('should complete without error even for non-existent document', async () => {
      const year = '1403';
      // FIX: service در cancel هیچ NotFoundException نمی‌ده
      // فقط update رو صدا می‌زنه که affected=0 برمی‌گردونه
      mockDetailRepo.update.mockResolvedValue({ affected: 0 } as any);

      await expect(service.cancel(year, 999, 1)).resolves.toBeUndefined();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  describe('updateStatus', () => {
    it('should update document status', async () => {
      const year = '1403';
      const docId = 1;
      const userId = 1;
      const statusDto = makeStatusDto(2);

      const existingMaster = makeSavedMaster(docId, { status: 1 });
      mockMasterRepo.findOne.mockResolvedValue(existingMaster);
      mockMasterRepo.save.mockResolvedValue({ ...existingMaster, status: 2 } as any);

      await service.updateStatus(year, docId, statusDto, userId);

      expect(mockDataSourceManager.getDataSource).toHaveBeenCalledWith(year);
      expect(mockMasterRepo.findOne).toHaveBeenCalledWith({ where: { id: docId } });
      expect(mockMasterRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ status: 2 }),
      );
    });

    it('should throw NotFoundException for non-existent document', async () => {
      const year = '1403';
      mockMasterRepo.findOne.mockResolvedValue(null);

      await expect(
        service.updateStatus(year, 999, makeStatusDto(2), 1),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  describe('getDescriptions', () => {
    it('should return all descriptions', async () => {
      const year = '1403';
      const mockDescriptions = [
        { id: 1, docDesc: 'Description 1', type: '1' },
        { id: 2, docDesc: 'Description 2', type: '2' },
      ];
      const qb = makeQueryBuilder(mockDescriptions);
      mockDescRepo.createQueryBuilder = jest.fn().mockReturnValue(qb);

      const result = await service.getDescriptions(year);

      expect(mockDataSourceManager.getDataSource).toHaveBeenCalledWith(year);
      expect(mockDescRepo.createQueryBuilder).toHaveBeenCalledWith('desc');
      expect(result).toEqual(['Description 1', 'Description 2']);
    });

    it('should filter descriptions by type', async () => {
      const year = '1403';
      const type = '1';
      const mockDescriptions = [{ id: 1, docDesc: 'Description 1', type: '1' }];
      const qb = makeQueryBuilder(mockDescriptions);
      mockDescRepo.createQueryBuilder = jest.fn().mockReturnValue(qb);

      const result = await service.getDescriptions(year, type);

      expect(qb.where).toHaveBeenCalledWith('desc.type = :type', { type });
      expect(result).toEqual(['Description 1']);
    });
  });
});