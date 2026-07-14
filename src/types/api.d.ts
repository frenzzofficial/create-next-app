/**
 * Generic success envelope some endpoints wrap responses in. Not every
 * endpoint uses this shape — services parse whatever the real response
 * shape is via Zod (packages/schemas), this is just here for the ones
 * that do use an envelope, so it isn't redefined per feature.
 */
export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  /** Field-level validation messages, e.g. from a 422 response. */
  errors?: Record<string, string[]>;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/** The `{ data, page, limit, total }` shape `paginatedResponseSchema` (packages/schemas/common.schema.ts) validates at runtime — this is its type-level counterpart for places that only need the shape, not the parser. */
export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
};
