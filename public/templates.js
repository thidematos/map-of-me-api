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
  <div class="story__card">
    <div class="flex flex-row justify-center gap-12 items-center w-full">
      <h3 class="story__text-age">Idade: 11</h3>
      <img src="./assets/btnOne.png" alt="" class="story__text-img" />
    </div>
    <p class="story__text-story">%STORY%</p>
    <p class="story__text-timestamp">%TIMESTAMP%</p>
  </div>
</section>
</main>`;
