// apps/frontend/app/(dashboard)/accounting/doc/api.ts

import type { DocFormData } from './types';

const BASE_URL = '/api/accounting/doc';

// سندی که از سرور برمی‌گردد (شامل شناسه و فیلدهای DocFormData)
export interface Doc extends DocFormData {
  id: string;
}

// خطای استاندارد API
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// هندلر مشترک برای بررسی پاسخ و خواندن JSON
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `خطا در ارتباط با سرور (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      // پاسخ JSON نبود؛ از پیام پیش‌فرض استفاده می‌شود
    }
    throw new ApiError(message, res.status);
  }

  // پاسخ ۲۰۴ (No Content) بدنه ندارد
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

const jsonHeaders = { 'Content-Type': 'application/json' };

// دریافت فهرست اسناد
export async function listDocs(): Promise<Doc[]> {
  const res = await fetch(BASE_URL, { method: 'GET' });
  return handleResponse<Doc[]>(res);
}

// دریافت یک سند بر اساس شناسه
export async function getDoc(id: string): Promise<Doc> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'GET' });
  return handleResponse<Doc>(res);
}

// ایجاد سند جدید
export async function createDoc(data: DocFormData): Promise<Doc> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(data),
  });
  return handleResponse<Doc>(res);
}

// ویرایش سند موجود
export async function updateDoc(id: string, data: DocFormData): Promise<Doc> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify(data),
  });
  return handleResponse<Doc>(res);
}

// حذف سند
export async function deleteDoc(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  await handleResponse<void>(res);
}
