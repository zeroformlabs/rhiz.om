import type { JWTPayload } from "jose";


export interface ApiMeResponse {
  message: string;
  user_id: string;
  payload: JWTPayload;
}