import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { beforeAll, afterAll, afterEach } from "vitest";
import { mockedDeputados } from "./data";
import { DEPUTADOS } from "./urls";

// Mocked data
const defaultDeputados = mockedDeputados();

// Mocked handlers
export const restHanlers = [
    http.get(DEPUTADOS.SUCCESS, () => {
        return HttpResponse.json(defaultDeputados);
    }),
    http.get(DEPUTADOS.NOT_FOUND, () => {
        return new HttpResponse(null, { status: 404 });
    }),
    http.get(DEPUTADOS.UNKNOWN_ERROR, () => {
        return new HttpResponse(null, { status: 500 });
    }),
];

// Setup server
const server = setupServer(...restHanlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
