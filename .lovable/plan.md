# Landing page — Costa Refrigeração

## Objetivo
Criar uma landing page responsiva, moderna e orientada à conversão para assistência técnica multimarcas em Brasília/DF, substituindo a tela inicial provisória.

## Estrutura e conteúdo
- Header compacto com identidade “Costa Refrigeração”, navegação por âncoras e CTA para WhatsApp.
- Hero de alto impacto com a oferta principal, dois CTAs e indicadores de confiança: atendimento rápido, garantia e peças originais.
- Faixa de marcas atendidas: Brastemp, Electrolux, Consul, Samsung e LG, apresentada claramente como atendimento multimarcas, sem sugerir credenciamento oficial.
- Seção de serviços com quatro cards: refrigeração, lavadoras/lava e seca, climatização e reparos técnicos especializados.
- Seção de diferenciais com orçamento transparente, diagnóstico preciso, rapidez e profissionais certificados.
- Bloco de agendamento com telefone `(61) 99880-8223`, formulário completo e envio pelo WhatsApp com mensagem preenchida a partir dos dados informados.
- Botão flutuante de WhatsApp e rodapé com atendimento de segunda a sábado, das 08h às 18h, links rápidos e aviso legal.

## Direção visual
- Tema dark moderno com preto profundo, superfícies grafite e textura luminosa sutil.
- Contraste dual em ciano frio e vermelho vibrante, aplicado com moderação nos CTAs, bordas e focos visuais.
- Tipografia sans-serif contemporânea, hierarquia editorial forte, glassmorphism discreto e cantos moderados.
- Fotografia principal própria da composição mostrando um técnico trabalhando em um eletrodoméstico, integrada ao hero sem aparência genérica de banco de imagens.
- Interações suaves: hover nos serviços, estados de foco acessíveis, navegação móvel e pulso contido no botão flutuante, respeitando redução de movimento.

## Comportamento e conversão
- Todos os CTAs de contato abrirão `wa.me/5561998808223` com mensagens contextuais prontas.
- O botão “Ver Serviços” fará rolagem suave até a seção correspondente.
- O formulário validará os campos essenciais no navegador e montará uma mensagem organizada com nome, telefone, local, aparelho e problema.
- Layout adaptado para celular, tablet e desktop, com navegação acessível e conteúdo sem sobreposição.

## Implementação técnica
- Reestruturar `src/routes/index.tsx` como página única sem dependência de backend.
- Atualizar os tokens semânticos em `src/styles.css` para a paleta, tipografia, sombras e animações do projeto, mantendo Tailwind v4.
- Ajustar o head da rota inicial com título, descrição, Open Graph e Twitter Card específicos da Costa Refrigeração.
- Carregar a fonte pelo head da rota raiz e usar ícones vetoriais do pacote já disponível no projeto ou formas CSS acessíveis.
- Gerar e incorporar a imagem de destaque como asset local otimizado, com texto alternativo e carregamento adequado.
- Verificar build, console e renderização responsiva da página final.
