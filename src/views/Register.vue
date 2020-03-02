<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашня бухгалтерія</span>
      <div class="input-field">
        <input id="email" type="text">
        <label for="email">Email</label>
        <small class="helper-text invalid">Email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" class="validate">
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
      </div>
      <div class="input-field">
        <input id="name" type="text" class="validate">
        <label for="name">Ім'я</label>
        <small class="helper-text invalid">Name</small>
      </div>
      <p>
        <label>
          <input type="checkbox" />
          <span>З правилами згідний</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зареєстуватись
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Вже є аккаунт?
        <a href="/">Ввійти!</a>
      </p>
    </div>
  </form>
</template>