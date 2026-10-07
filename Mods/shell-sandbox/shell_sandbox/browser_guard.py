"""Reject browser-originated requests to the unauthenticated local MCP service."""

from collections.abc import Mapping

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import PlainTextResponse, Response


def is_browser_request(headers: Mapping[str, str]) -> bool:
    site = headers.get("sec-fetch-site")
    if site is not None:
        return site.lower() != "same-origin"
    return headers.get("origin") is not None


class BrowserRequestGuard(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        if is_browser_request(request.headers):
            return PlainTextResponse("browser requests are not accepted", status_code=403)
        return await call_next(request)
