addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    const url = new URL(request.url);
    const fetchAPI = request.url.replace(url.host, 'api.openai.com');
    
    // 部分代理工具，请求由浏览器发起，跨域请求时会先发送一个 preflight 进行检查，也就是 OPTIONS 请求
    // 需要响应该请求，否则后续的 POST 会失败
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  
    let body;
    if (request.method === 'POST') body = await request.json();
  
    const authKey = request.headers.get('Authorization');
    if (!authKey) return new Response("Not allowed", { status: 403 });
    
    const payload = {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: authKey,
      },
      body: typeof body === 'object' ? JSON.stringify(body) : '{}',
    };
    // 在 Cloudflare 中，HEAD 和 GET 请求带 body 会报错
    if (['HEAD', 'GET'].includes(request.method)) delete payload.body;
  
    // 入参中如果包含了 stream=true，则表现形式为流式输出
    const response = await fetch(fetchAPI, payload);
    if (body && body.stream !== true) {
      const results = await response.json();
      return new Response(JSON.stringify(results), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }
  }