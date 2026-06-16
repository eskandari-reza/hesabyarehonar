// src/coa/coa.controller.ts
import { Controller, Get } from "@nestjs/common";
import { CoaService } from "./coa.service";

@Controller("coa")
export class CoaController {
  constructor(private readonly coaService: CoaService) {}

  @Get()
  findAll() {
    return this.coaService.findAll();
  }
}
