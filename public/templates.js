exports.adminView = `<main class="flex flex-col justify-center items-center gap-24 w-full">
<header class="flex flex-row justify-center item w-full gap-24 mt-16">
  <img src="./assets/logo300.png" alt="" class="w-[15%]" />
  <div class="flex flex-col justify-center items-center gap-5">
    <h2 class="guideName font-jakarta text-3xl tracking-wider text-gray-800">
      Bem vindo novamente, %GUIA_NAME%!
    </h2>
    <h3
      class="font-amatic text-4xl font-bold text-gray-800 tracking-wider"
    >
      Qual caminho seguiremos?
    </h3>
  </div>
  <a
    class="font-amatic text-3xl bg-azulClaro text-gray-50 p-4 absolute rounded-lg shadow drop-shadow-lg hover:underline decoration-2 hover:bg-orange-300 right-[2%] top-[2%]"
    href="index.html"
    >Sair!</a
  >
</header>
<section class="dashboard__button-container flex flex-row justify-evenly items-center w-full">
  <div class="dashboard__button" data-hash="Statistics">
    <img
      src="./assets/not-found.png"
      alt=""
      class="dashboard__button-img"
    />
    <p class="dashboard__button-text">Estatística</p>
  </div>
  <div class="dashboard__button" data-hash="Feedbacks">
    <img
      src="./assets/btnEight.png"
      alt=""
      class="dashboard__button-img"
    />
    <p class="dashboard__button-text">Feedbacks</p>
  </div>
  <div class="dashboard__button" data-hash="Stories">
    <img
      src="./assets/btnFour.png"
      alt=""
      class="dashboard__button-img"
    />
    <p class="dashboard__button-text">Relatos</p>
  </div>
</section>
</main>
<div class="loader hidden"></div>`;

exports.Stories = `<main class="flex flex-col justify-center gap-20 items-center">
<button class="back__button">Voltar!</button>
<header class="flex flex-row justify-center items-center gap-16">
  <img src="./assets/logo300.png" alt="" />
  <div
    class="flex flex-col justify-center items-center tracking-wider text-gray-700 gap-4"
  >
    <h1 class="font-amatic text-6xl text-azulEscuro">
      Relatos de nossos exploradores
    </h1>
    <div
      class="flex flex-col justify-center items-center font-jakarta text-lg"
    >
      <p class="">
        Veja os relatos iniciais de nossos pequenos exploradores e seus
        responsáveis.
      </p>
      <p class="">
        Esses relatos foram cedidos no momento de criação de seu usuário.
      </p>
    </div>
  </div>
</header>
<section class="story__container w-full h-full">
</section>
</main>`;

exports.Feedbacks = `<div class="feedbacks__modal" style="display: none">
<div class="w-[25%] flex flex-col justify-center items-center gap-10">
  <img
    src="./assets/nice-landscape.png"
    alt=""
    class="w-full drop-shadow-lg"
  />
  <p
    class="font-amatic text-3xl text-center text-gray-800 drop-shadow-lg"
  >
    Toda aventura tem sua história...
  </p>
</div>
<div
  class="w-[75%] h-full flex flex-col justify-start items-center gap-8"
>
  <h2 class="modal__user font-amatic text-5xl text-orange-400 font-bold">%USER%</h2>
  <div
    class="modal__cards-container flex flex-row justify-center items-start flex-wrap w-full h-full gap-6 overflow-y-scroll"
  >
    
  </div>
</div>
</div>
<div class="feedbacks__modal-cover" style="display: none"></div>
<main class="flex flex-col justify-center gap-20 items-center">
<button class="back__button">Voltar!</button>
<header class="flex flex-row justify-center items-center gap-16">
  <img src="./assets/logo300.png" alt="" />
  <div
    class="flex flex-col justify-center items-center tracking-wider text-gray-700 gap-4"
  >
    <h1 class="font-amatic text-6xl text-azulEscuro">
      Feedbacks de nossos exploradores
    </h1>
    <div
      class="flex flex-col justify-center items-center font-jakarta text-lg"
    >
      <p class="">Veja os feedbacks feitos pelos nossos exploradores!</p>
      <p class="">
        Esses feedbacks estão organizados por cada explorador.
      </p>
    </div>
  </div>
</header>
<section class="feedbacks__container w-full h-full">
  
</section>
</main>`;

exports.Statistics = `<main
class="flex flex-col justify-center gap-20 items-center pt-8 w-full h-full py-16"
>
<button class="back__button">Voltar!</button>
<header class="flex flex-row justify-center items-center gap-16">
  <img src="./assets/logo300.png" alt="" />
  <div
    class="flex flex-col justify-center items-center tracking-wider text-gray-700 gap-4"
  >
    <h1 class="font-amatic text-6xl text-azulEscuro">
      Desempenho de nossos exploradores
    </h1>
    <div
      class="flex flex-col justify-center items-center font-jakarta text-lg"
    >
      <p class="">
        Veja a estatística do desempenho de nossos aventureiros.
      </p>
    </div>
  </div>
</header>
<section class="statistics__button-container w-full h-full flex flex-col justify-center items-center gap-8">
  <div
    class="statistic__button-firstContainer flex flex-row justify-center items-center text-gray-50 font-amatic text-4xl underline decoration-2 gap-12 w-full"
  >
    <button
      class="statistic__button-first bg-orange-400 p-4 rounded-lg shadow-lg drop-shadow w-[15%]"
      data-firstOption="levels"
    >
      <p>Fases</p>
    </button>
    <button
      class="statistic__button-first bg-orange-400 p-4 rounded-lg shadow-lg drop-shadow w-[15%]"
      data-firstOption="metrics"
    >
      <p>Métricas</p>
    </button>
    <button
      class="statistic__button-first bg-orange-400 p-4 rounded-lg shadow-lg drop-shadow w-[15%]"
      data-firstOption="ages"
    >
      <p>Faixas Etárias</p>
    </button>
  </div>
  <div
    class="statistics__button-ages flex flex-row justify-center items-center gap-8 hidden"
  >
    <button class="statistic__button" data-ages="3-5">3-5 anos</button>
    <button class="statistic__button" data-ages="6-8">6-8 anos</button>
    <button class="statistic__button" data-ages="9-11">9-11 anos</button>
    <button class="statistic__button" data-ages="12-99">Demais idades</button>
  </div>
  <div
    class="statistics__button-metrics flex flex-row justify-center items-center gap-8 w-full hidden"
  >
    <button class="statistic__button" data-metrics="focusTime">
      <i class="fa-solid fa-arrows-to-circle text-3xl"></i>
      <p class="text-2xl">Foco</p>
    </button>
    <button class="statistic__button" data-metrics="durationToComplete">
      <i class="fa-solid fa-stopwatch text-3xl"></i>
      <p class="text-xl">Tempo de montagem</p>
    </button>
    <button class="statistic__button" data-metrics="hints">
      <i class="fa-solid fa-signs-post text-3xl"></i>
      <p class="text-xl">Dicas utilizadas</p>
    </button>
    <button class="statistic__button" data-metrics="wrongMoves">
      <i class="fa-solid fa-road-circle-xmark text-3xl"></i>
      <p class="text-2xl">Erros</p>
    </button>
  </div>
  <div
    class="statistics__button-levels flex flex-row justify-center items-center gap-8 w-full hidden"
  >
    <button class="statistic__button" data-levels="mapOne">
      <img
        src="./assets/btnOne.png"
        alt=""
        class="w-[70%]"
        
      />
      <h4 class="">Felicidade!</h4>
    </button>
    <button class="statistic__button" data-levels="mapTwo">
      <img
        src="./assets/btnTwo.png"
        alt=""
        class="w-[70%]"
        
      />
      <h4 class="">Admiração!</h4>
    </button> 
    <button class="statistic__button" data-levels="mapThree">
      <img
        src="./assets/btnThree.png"
        alt=""
        class="w-[70%]"
        
      />
      <h4 class="">Medo!</h4>
    </button>
    <button class="statistic__button" data-levels="mapFour">
      <img
        src="./assets/btnFour.png"
        alt=""
        class="w-[70%]"
        
      />
      <h4 class="">Coragem!</h4>
    </button>
    <button class="statistic__button" data-levels="mapFive">
      <img
        src="./assets/btnFive.png"
        alt=""
        class="w-[70%]"
        
      />
      <h4 class="">Diversão!</h4>
    </button>
    <button class="statistic__button" data-levels="mapSix">
      <img
        src="./assets/btnSix.png"
        alt=""
        class="w-[70%]"
        
      />
      <h4 class="">Empatia!</h4>
    </button>
    <button class="statistic__button" data-levels="mapSeven">
      <img
        src="./assets/btnSeven.png"
        alt=""
        class="w-[70%]"
        
      />
      <h4 class="">Esperança!</h4>
    </button>
    <button class="statistic__button" data-levels="mapEight">
      <img
        src="./assets/btnEight.png"
        alt=""
        class="w-[70%]"
        
      />
      <h4 class="">The Map of Me!</h4>
    </button>
  </div>
</section>
<section
  class="statistics__info flex flex-col justify-center items-center w-full w-full gap-12"
>
  <h3
    class="statistics__info-message font-amatic text-4xl text-orange-300 font-bold drop-shadow-sm"
  >
    Selecione uma das opções para começar!
  </h3>
  <img
    src="./assets/father.png"
    alt=""
    class="w-[8%] drop-shadow-xl"
  />
</section>
<section class="statistics__chart-container w-[80%] h-[60vh] flex flex-row flex-wrap justify-center items-center gap-8 hidden "></section>

<section class="statistics__chart-container-metrics w-[90%] h-[60vh] flex flex-row justify-center items-center gap-12 hidden ">
</section>

<section class="statistics__error w-full flex flex-col justify-center items-center gap-12 hidden">
<div class="flex flex-col justify-center items-center gap-8">
<div
  class="flex flex-col justify-center items-center font-jakarta text-gray-700 gap-4"
>
  <h3 class="font-amatic tracking-wide text-4xl underline decoration-2">
    Infelizmente, ainda não há dados para essas fases!
  </h3>
  <p class="text-lg">
    Vamos esperar nossos aventureiros explorarem um pouco mais!
  </p>
</div>
<img src="./assets/panda.png" alt="" class="w-[35%]" />
</div>
</section>
</main>`;
