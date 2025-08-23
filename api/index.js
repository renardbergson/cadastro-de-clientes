/* 
  1.Desenvolvimento (Local):
  Angular: http://localhost:4201 (ng serve)
  Vercel Functions: http://localhost:3000 (vercel dev)
  Proxy: Angular redireciona /api/* → Vercel Functions

  2.Produção (Vercel):
  Angular + Vercel Functions: https://dominio.vercel.app (mesmo domínio)
  Não há portas separadas - tudo roda junto

  Acesso:
  1.Desenvolvimento:
  Frontend: http://localhost:4201
  API: http://localhost:4201/api/test (proxy redireciona)

  2.Produção:
  Frontend: https://dominio.vercel.app
  API: https://dominio.vercel.app/api/test

  Funcionamento:
  Todas as requisições vão para: localhost:4201
  ├── / → Angular (frontend)
  ├── /cadastro → Angular (frontend)  
  ├── /consulta → Angular (frontend)
  └── /api/* → Proxy redireciona para localhost:3000

  O proxy intercepta requisições que começam com /api/ e 
  redireciona automaticamente para localhost:3000.

  Para rodar Vercel Functions localmente:
  ✅ Vercel CLI instalado (npm install -g vercel)
  ✅ Comando vercel dev para rodar as functions

  PS: rodar Angular e Vercel em terminais diferentes!

  Acesso:
  localhost:.../api/...
*/

export default function handler(req, res) {
  res.json({
    message: "Bem-vindo ao servidor Vercel Functions!",
    status: "online",
    timestamp: new Date().toISOString(),
  });
}
