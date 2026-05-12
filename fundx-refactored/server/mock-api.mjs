import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

const port = Number(process.env.MOCK_API_PORT ?? process.env.PORT ?? 4000);
const now = () => new Date().toISOString();

const users = new Map([
  [
    "admin@quickfundx.test",
    {
      id: "user-admin-demo",
      name: "Demo Admin",
      email: "admin@quickfundx.test",
      password: "password123",
      role: "ADMIN",
      avatar: null,
      verified: true,
    },
  ],
  [
    "customer@quickfundx.test",
    {
      id: "user-customer-demo",
      name: "Demo Customer",
      email: "customer@quickfundx.test",
      password: "password123",
      role: "CUSTOMER",
      avatar: null,
      verified: true,
    },
  ],
]);

const campaigns = [
  {
    id: "cmp-solar-grid",
    title: "Community Solar Grid Expansion",
    description: "Help install solar micro-grid infrastructure for small businesses and homes in fast-growing neighborhoods.",
    category: "Clean Energy",
    targetAmount: "250000",
    raisedAmount: "184500",
    images: ["https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80"],
    deadline: "2026-09-30T00:00:00.000Z",
    featured: true,
    creator: { id: "user-admin-demo", name: "Demo Admin", avatar: null },
  },
  {
    id: "cmp-health-mobile",
    title: "Mobile Health Clinic Fleet",
    description: "Fund accessible primary-care vans with diagnostics, telemedicine support, and transparent impact reporting.",
    category: "Healthcare",
    targetAmount: "180000",
    raisedAmount: "126700",
    images: ["https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"],
    deadline: "2026-08-15T00:00:00.000Z",
    featured: true,
    creator: { id: "user-customer-demo", name: "Demo Customer", avatar: null },
  },
  {
    id: "cmp-agri-tech",
    title: "Smart Irrigation for Family Farms",
    description: "Scale water-saving sensor kits that help independent farms reduce waste and improve seasonal yields.",
    category: "AgriTech",
    targetAmount: "95000",
    raisedAmount: "58800",
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"],
    deadline: "2026-07-20T00:00:00.000Z",
    featured: false,
    creator: { id: "user-admin-demo", name: "Demo Admin", avatar: null },
  },
];

function publicUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Access-Control-Allow-Origin": process.env.CORS_ORIGIN ?? "http://localhost:8080",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function authPayload(user) {
  return {
    user: publicUser(user),
    accessToken: `mock-access-${user.id}-${Date.now()}`,
    refreshToken: `mock-refresh-${user.id}-${Date.now()}`,
  };
}

function parseRequest(req) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  return { pathname: url.pathname.replace(/^\/api\/v1/, ""), searchParams: url.searchParams };
}

function getCurrentUser(req) {
  const authorization = req.headers.authorization ?? "";
  const id = authorization.match(/^Bearer mock-access-(.*?)-\d+$/)?.[1];
  return [...users.values()].find((user) => user.id === id) ?? users.get("customer@quickfundx.test");
}

const server = createServer(async (req, res) => {
  try {
    if (req.method === "OPTIONS") return json(res, 204, {});

    const { pathname, searchParams } = parseRequest(req);

    if (req.method === "GET" && pathname === "/health") {
      return json(res, 200, { success: true, data: { service: "quick-fundx-mock-api", time: now() } });
    }

    if (req.method === "POST" && pathname === "/auth/login") {
      const body = await readBody(req);
      const user = users.get(String(body.email ?? "").toLowerCase());
      if (!user || user.password !== body.password) {
        return json(res, 401, { success: false, message: "Invalid email or password" });
      }
      return json(res, 200, { success: true, data: authPayload(user) });
    }

    if (req.method === "POST" && pathname === "/auth/register") {
      const body = await readBody(req);
      const email = String(body.email ?? "").toLowerCase();
      if (!email || !body.password || !body.name) {
        return json(res, 400, { success: false, message: "Name, email, and password are required" });
      }
      if (users.has(email)) {
        return json(res, 409, { success: false, message: "User already exists" });
      }
      const user = {
        id: randomUUID(),
        name: body.name,
        email,
        password: body.password,
        role: body.role ?? "CUSTOMER",
        avatar: null,
        verified: false,
      };
      users.set(email, user);
      return json(res, 201, { success: true, data: authPayload(user) });
    }

    if (req.method === "POST" && pathname === "/auth/logout") {
      return json(res, 200, { success: true, data: { message: "Logged out" } });
    }

    if (req.method === "GET" && pathname === "/auth/me") {
      return json(res, 200, { success: true, data: { user: publicUser(getCurrentUser(req)) } });
    }

    if (req.method === "GET" && pathname === "/campaigns") {
      const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
      const limit = Math.min(Math.max(Number(searchParams.get("limit") ?? 6), 1), 50);
      const search = (searchParams.get("search") ?? "").toLowerCase();
      const filtered = campaigns.filter((campaign) =>
        [campaign.title, campaign.description, campaign.category].some((field) => field.toLowerCase().includes(search)),
      );
      const start = (page - 1) * limit;
      return json(res, 200, {
        success: true,
        data: {
          items: filtered.slice(start, start + limit),
          meta: { page, limit, total: filtered.length, pages: Math.ceil(filtered.length / limit) },
        },
      });
    }

    if (req.method === "GET" && pathname === "/dashboard") {
      const user = getCurrentUser(req);
      return json(res, 200, {
        success: true,
        data: {
          role: user.role,
          stats: [
            { title: "Total Funded", value: "$184.5K", change: "+12.4%", changeType: "up" },
            { title: "Active Campaigns", value: "3", change: "+1", changeType: "up" },
            { title: "Portfolio Score", value: "82", change: "+4", changeType: "up" },
          ],
          chart: [
            { month: "Jan", score: 62 },
            { month: "Feb", score: 69 },
            { month: "Mar", score: 74 },
            { month: "Apr", score: 82 },
          ],
          applications: [],
        },
      });
    }

    return json(res, 404, { success: false, message: `No mock route for ${req.method} ${pathname}` });
  } catch (error) {
    return json(res, 500, { success: false, message: error instanceof Error ? error.message : "Mock API error" });
  }
});

server.listen(port, () => {
  console.log(`Quick FundX mock API running at http://localhost:${port}/api/v1`);
  console.log("Demo login: customer@quickfundx.test / password123");
});
