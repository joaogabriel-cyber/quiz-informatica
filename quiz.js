// =======================================================
// 1. DADOS DO QUIZ (30 Perguntas em 3 Níveis)
// =======================================================
export const quizData = [
    // =======================================================
    // NÍVEL 1: BÁSICO - CONCEITOS E PERIFÉRICOS (10 Perguntas)
    // =======================================================
    {
        pergunta: "Qual é a principal função do Monitor em um computador?",
        opcoes: ["Processar dados rapidamente.", "Imprimir documentos.", "Exibir informações visuais.", "Armazenar arquivos permanentemente."],
        respostaCorreta: "Exibir informações visuais.",
        nivel: "Básico",
        explanation: "O monitor é um periférico de saída que tem a função primária de exibir a interface gráfica e o resultado das operações do computador."
    },
    {
        pergunta: "O que é o 'Mouse' no contexto da informática?",
        opcoes: ["Um dispositivo de saída de áudio.", "Um sistema operacional.", "Um periférico de entrada.", "Um tipo de memória volátil."],
        respostaCorreta: "Um periférico de entrada.",
        nivel: "Básico",
        explanation: "O mouse é um periférico de entrada que permite ao usuário interagir com a interface gráfica, movendo um cursor e realizando cliques."
    },
    {
        pergunta: "Qual tecla de atalho é universalmente usada para 'Salvar' um documento?",
        opcoes: ["Ctrl + C", "Ctrl + P", "Ctrl + S", "Ctrl + Z"],
        respostaCorreta: "Ctrl + S",
        nivel: "Básico",
        explanation: "Ctrl + S (de Save/Salvar) é o atalho padrão na maioria dos programas para salvar rapidamente o trabalho em andamento."
    },
    {
        pergunta: "O que é Hardware?",
        opcoes: ["A parte lógica (programas).", "O sistema de internet.", "A parte física e tangível do computador.", "Os arquivos de áudio."],
        respostaCorreta: "A parte física e tangível do computador.",
        nivel: "Básico",
        explanation: "Hardware é qualquer componente físico do computador que você pode tocar, como teclado, mouse ou CPU."
    },
    {
        pergunta: "O que é Software?",
        opcoes: ["O cabo de energia.", "A tela do monitor.", "A parte lógica e intangível (programas).", "A impressora."],
        respostaCorreta: "A parte lógica e intangível (programas).",
        nivel: "Básico",
        explanation: "Software é a parte lógica, o conjunto de instruções ou programas que dão comandos ao hardware, como o Windows ou o Word."
    },
    {
        pergunta: "Qual periférico é de 'Saída', usado para transformar dados digitais em papel?",
        opcoes: ["Scanner", "Teclado", "Impressora", "Webcam"],
        respostaCorreta: "Impressora",
        nivel: "Básico",
        explanation: "Periféricos de saída enviam dados do computador para o usuário. A impressora produz uma saída física (papel)."
    },
    {
        pergunta: "Qual é a função básica de um 'Sistema Operacional' (SO)?",
        opcoes: ["Criar documentos de texto.", "Gerenciar o hardware e executar outros programas.", "Acessar a internet.", "Proteger contra vírus."],
        respostaCorreta: "Gerenciar o hardware e executar outros programas.",
        nivel: "Básico",
        explanation: "O SO (ex: Windows, Linux) é a base que permite que o computador funcione, controlando o hardware e fornecendo uma plataforma para outros softwares."
    },
    {
        pergunta: "Qual tecla de atalho é usada para 'Copiar' um texto ou arquivo?",
        opcoes: ["Ctrl + V", "Ctrl + A", "Ctrl + X", "Ctrl + C"],
        respostaCorreta: "Ctrl + C",
        nivel: "Básico",
        explanation: "Ctrl + C (de Copy/Copiar) duplica o item selecionado para a área de transferência."
    },
    {
        pergunta: "Qual é a principal função de um 'Navegador' (Browser) na internet?",
        opcoes: ["Gerenciar arquivos de computador.", "Criar apresentações de slides.", "Acessar e exibir páginas da Web.", "Proteger contra hackers."],
        respostaCorreta: "Acessar e exibir páginas da Web.",
        nivel: "Básico",
        explanation: "Navegadores (como Chrome, Firefox) são softwares projetados para ler e exibir o conteúdo de sites na internet."
    },
    {
        pergunta: "O que significa a sigla PC?",
        opcoes: ["Processamento Central", "Placa de Componentes", "Computador Pessoal (Personal Computer)", "Programa Central"],
        respostaCorreta: "Computador Pessoal (Personal Computer)",
        nivel: "Básico",
        explanation: "PC significa Personal Computer, um computador destinado ao uso individual, em contraste com grandes mainframes."
    },

    // =======================================================
    // NÍVEL 2: INTERMEDIÁRIO - HARDWARE E ARMAZENAMENTO (10 Perguntas)
    // =======================================================
    {
        pergunta: "Qual componente é responsável pelo armazenamento de dados de longo prazo (permanente) no computador?",
        opcoes: ["Memória RAM", "CPU", "Disco Rígido (HD/SSD)", "Placa de Vídeo (GPU)"],
        respostaCorreta: "Disco Rígido (HD/SSD)",
        nivel: "Intermediário",
        explanation: "O Disco Rígido (HD ou o moderno SSD) armazena permanentemente o sistema operacional, programas e arquivos do usuário."
    },
    {
        pergunta: "A sigla CPU significa:",
        opcoes: ["Central Power Unit", "Central Processing Unit", "Computer Program Utility", "Core Performance Unit"],
        respostaCorreta: "Central Processing Unit",
        nivel: "Intermediário",
        explanation: "CPU significa Unidade Central de Processamento (Central Processing Unit) e é o chip que executa as instruções do computador."
    },
    {
        pergunta: "O que é 'Cache' no contexto de memória e CPU?",
        opcoes: ["Um tipo de armazenamento externo.", "Uma memória muito pequena e extremamente rápida.", "A memória principal (RAM).", "O nome da placa-mãe."],
        respostaCorreta: "Uma memória muito pequena e extremamente rápida.",
        nivel: "Intermediário",
        explanation: "A memória Cache é a memória mais rápida, que armazena temporariamente dados que a CPU provavelmente usará a seguir, acelerando o processamento."
    },
    {
        pergunta: "Qual unidade de medida corresponde a 1024 Gigabytes (GB)?",
        opcoes: ["Megabyte (MB)", "Kilobyte (KB)", "Terabyte (TB)", "Petabyte (PB)"],
        respostaCorreta: "Terabyte (TB)",
        nivel: "Intermediário",
        explanation: "No sistema binário, 1 Terabyte (TB) é composto por 1024 Gigabytes (GB). (KB < MB < GB < TB < PB)."
    },
    {
        pergunta: "Para que serve uma 'Placa de Vídeo' (GPU)?",
        opcoes: ["Apenas para jogos.", "Processar e exibir gráficos e imagens.", "Gerenciar a conexão Wi-Fi.", "Armazenar o sistema operacional."],
        respostaCorreta: "Processar e exibir gráficos e imagens.",
        nivel: "Intermediário",
        explanation: "A GPU (Graphics Processing Unit) é especializada em cálculos de imagens e gráficos, aliviando a carga da CPU e melhorando a performance visual."
    },
    {
        pergunta: "Qual dos seguintes é um exemplo de 'memória volátil'?",
        opcoes: ["Pendrive", "Disco Rígido (HD)", "Memória RAM", "SSD"],
        respostaCorreta: "Memória RAM",
        nivel: "Intermediário",
        explanation: "RAM é volátil, pois perde todos os dados assim que o computador é desligado. Pendrives, HDs e SSDs são memórias não voláteis (permanentes)."
    },
    {
        pergunta: "Qual tecla de atalho é usada para 'Recortar' um item (movê-lo para a área de transferência)?",
        opcoes: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"],
        respostaCorreta: "Ctrl + X",
        nivel: "Intermediário",
        explanation: "Ctrl + X (de cut/cortar) remove o item selecionado e o coloca na área de transferência para ser colado em outro local."
    },
    {
        pergunta: "O que é o 'BIOS' ou 'UEFI' de um computador?",
        opcoes: ["O sistema operacional principal.", "O programa que inicializa o hardware e carrega o SO.", "Um tipo de vírus.", "Um aplicativo de edição de vídeo."],
        respostaCorreta: "O programa que inicializa o hardware e carrega o SO.",
        nivel: "Intermediário",
        explanation: "O BIOS/UEFI é um firmware que reside na placa-mãe, responsável por testar e inicializar todos os componentes de hardware quando o computador é ligado."
    },
    {
        pergunta: "Qual dos seguintes é um dispositivo de entrada **e** saída?",
        opcoes: ["Teclado", "Monitor", "Impressora", "Touchscreen"],
        respostaCorreta: "Touchscreen",
        nivel: "Intermediário",
        explanation: "O Touchscreen funciona como entrada (toque) e como saída (exibe a imagem), sendo um dispositivo híbrido."
    },
    {
        pergunta: "Qual é a principal diferença de velocidade entre um HD e um SSD?",
        opcoes: ["HD é mais rápido que SSD.", "SSD é mais rápido por usar chips de memória flash (sem partes móveis).", "A velocidade é a mesma, só muda o tamanho.", "HD é volátil e SSD não."],
        respostaCorreta: "SSD é mais rápido por usar chips de memória flash (sem partes móveis).",
        nivel: "Intermediário",
        explanation: "SSDs (Solid State Drives) usam memória flash, eliminando a lentidão das peças móveis encontradas nos HDs (Hard Disk Drives), o que resulta em inicialização e carregamento muito mais rápidos."
    },

    // =======================================================
    // NÍVEL 3: AVANÇADO - REDES, SEGURANÇA E SOFTWARE (10 Perguntas)
    // =======================================================
    {
        pergunta: "Qual é o termo para o software que se instala sem permissão e exibe anúncios indesejados?",
        opcoes: ["Firewall", "Spyware", "Antivírus", "Adware"],
        respostaCorreta: "Adware",
        nivel: "Avançado",
        explanation: "Adware é um tipo de software malicioso projetado especificamente para exibir propagandas e anúncios, muitas vezes de forma intrusiva, para gerar receita."
    },
    {
        pergunta: "No MS Excel, qual caractere deve obrigatoriamente iniciar uma fórmula?",
        opcoes: ["#", "@", "=", "$"],
        respostaCorreta: "=",
        nivel: "Avançado",
        explanation: "Todas as fórmulas em planilhas eletrônicas (Excel, Google Sheets) devem começar com o sinal de igual (=) para que o programa as interprete como cálculos e não como texto."
    },
    {
        pergunta: "Qual é o nome do ataque onde o criminoso se passa por uma entidade confiável para roubar dados (senhas, cartões)?",
        opcoes: ["Spoofing", "Trojan", "Phishing", "Worm"],
        respostaCorreta: "Phishing",
        nivel: "Avançado",
        explanation: "Phishing é uma fraude que usa iscas (e-mails, mensagens) para 'pescar' informações confidenciais, fazendo a vítima acreditar que está em um site ou comunicação legítima."
    },
    {
        pergunta: "Qual protocolo é responsável por atribuir, automaticamente, endereços IP aos dispositivos em uma rede?",
        opcoes: ["DNS", "FTP", "DHCP", "HTTP"],
        respostaCorreta: "DHCP",
        nivel: "Avançado",
        explanation: "DHCP (Dynamic Host Configuration Protocol) é o serviço de rede que distribui endereços IP dinamicamente para que os dispositivos possam se comunicar na rede."
    },
    {
        pergunta: "O que é 'Cloud Computing' (Computação em Nuvem)?",
        opcoes: ["Armazenamento local em um servidor.", "O uso da internet para acessar serviços e dados remotos.", "Um novo tipo de sistema operacional.", "Apenas o uso de e-mail."],
        respostaCorreta: "O uso da internet para acessar serviços e dados remotos.",
        nivel: "Avançado",
        explanation: "Computação em Nuvem refere-se à entrega de serviços de computação (servidores, armazenamento, bancos de dados, software) pela internet ('a nuvem')."
    },
    {
        pergunta: "Qual a função de um 'Firewall'?",
        opcoes: ["Acelerar a velocidade da internet.", "Monitorar e filtrar o tráfego de rede para segurança.", "Organizar arquivos no disco.", "Desligar o computador remotamente."],
        respostaCorreta: "Monitorar e filtrar o tráfego de rede para segurança.",
        nivel: "Avançado",
        explanation: "O Firewall age como uma barreira, controlando o que entra e o que sai da sua rede, bloqueando acessos não autorizados ou maliciosos."
    },
    {
        pergunta: "Qual dos seguintes softwares faz parte do Pacote Office?",
        opcoes: ["Linux", "Google Chrome", "Adobe Photoshop", "Microsoft PowerPoint"],
        respostaCorreta: "Microsoft PowerPoint",
        nivel: "Avançado",
        explanation: "PowerPoint é o software do Pacote Office dedicado à criação de apresentações de slides. Os demais são um Sistema Operacional, um Navegador e um Editor de Imagens, respectivamente."
    },
    {
        pergunta: "O que é 'Compactação de Arquivo' (ZIP/RAR)?",
        opcoes: ["Ocultar o arquivo.", "Tornar o arquivo menor para economia de espaço e transferência.", "Proteger o arquivo com senha.", "Converter o arquivo para outro formato."],
        respostaCorreta: "Tornar o arquivo menor para economia de espaço e transferência.",
        nivel: "Avançado",
        explanation: "A compactação usa algoritmos para reduzir o tamanho dos arquivos, tornando-os mais fáceis de armazenar ou enviar pela internet."
    },
    {
        pergunta: "Qual o atalho no Windows para abrir o 'Gerenciador de Tarefas'?",
        opcoes: ["Ctrl + Alt + F4", "Windows + R", "Ctrl + Alt + Del (ou Ctrl + Shift + Esc)", "Alt + Tab"],
        respostaCorreta: "Ctrl + Alt + Del (ou Ctrl + Shift + Esc)",
        nivel: "Avançado",
        explanation: "Ctrl + Shift + Esc é o atalho direto para o Gerenciador de Tarefas no Windows, enquanto Ctrl + Alt + Del abre uma tela de segurança que inclui a opção do Gerenciador."
    },
    {
        pergunta: "O que significa 'Backup' em informática?",
        opcoes: ["O processo de formatação do disco.", "Uma cópia de segurança de dados para recuperação em caso de perda.", "A velocidade de conexão de internet.", "O nome da memória RAM."],
        respostaCorreta: "Uma cópia de segurança de dados para recuperação em caso de perda.",
        nivel: "Avançado",
        explanation: "Backup é a prática de fazer cópias dos dados para que eles possam ser restaurados após um evento de falha, perda de dados ou ataque malicioso."
    }
];