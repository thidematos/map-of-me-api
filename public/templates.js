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
