// 에러 코드 상수 정의
const ERROR_CODES = {
  VALIDATION_ERROR: { code: 4001, status: 400, message: "유효성 검사 오류" },
  CAST_ERROR: { code: 4002, status: 400, message: "잘못된 데이터 형식" },
  DB_CONNECTION_ERROR: { code: 5031, status: 503, message: "DB 연결 오류" },
  DUPLICATE_KEY: { code: 4091, status: 409, message: "중복 키 오류" },
  UNAUTHORIZED: { code: 4011, status: 401, message: "인증 오류" },
  FORBIDDEN: { code: 4031, status: 403, message: "권한 오류" },
  EMPTY_BODY: { code: 4003, status: 400, message: "빈 요청 본문" },
  UNKNOWN_ERROR: { code: 5001, status: 500, message: "알 수 없는 오류" },
};

export const errorHandler = (err, res) => {
  // 구조 분해 할당은 어려워서 if로 대체 했습니다

  console.error(err);

  let errorResponse = ERROR_CODES.UNKNOWN_ERROR;

  if (err.message === "ValidationError") {
    errorResponse = ERROR_CODES.VALIDATION_ERROR;
  } else if (err.name === "CastError") {
    errorResponse = ERROR_CODES.CAST_ERROR;
  } else if (err.message.includes("ECONNREFUSED")) {
    errorResponse = ERROR_CODES.DB_CONNECTION_ERROR;
  } else if (err.message.includes("duplicate key error")) {
    errorResponse = ERROR_CODES.DUPLICATE_KEY;
  } else if (err.message.includes("Unauthorized")) {
    errorResponse = ERROR_CODES.UNAUTHORIZED;
  } else if (err.message.includes("Forbidden")) {
    errorResponse = ERROR_CODES.FORBIDDEN;
  } else if (err.message.includes("요청 본문이 비어 있습니다.")) {
    errorResponse = ERROR_CODES.EMPTY_BODY;
  }

  res.status(errorResponse.status).json({
    success: false,
    code: errorResponse.code,
    message: errorResponse.message,
    detail: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
