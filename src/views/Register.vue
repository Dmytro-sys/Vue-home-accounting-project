<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашня бухгалтерія</span>

      <div class="input-field">
        <input id="email" type="text" v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}">
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">Поле Email не має бути
          пустим</small>
        <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">Введіть коректний
          Email</small>
      </div>

      <div class="input-field">
        <input id="password" type="password" v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}">
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Введіть пароль</small>
        <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Пароль має мати
          мінімум {{$v.password.$params.minLength.min}} символів. Введено {{password.length}}</small>
      </div>

      <div class="input-field">
        <input id="name" type="text" v-model.trim="name" :class="{invalid: $v.name.$dirty && !$v.name.required}">
        <label for="name">Ім'я</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Введіть ваше Ім'я</small>
      </div>

      <p>
        <label>
          <input type="checkbox" v-model="agree" />
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
        <router-link to="/login">Ввійти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {
    email,
    required,
    minLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'register',
    data: () => ({
      email: '',
      password: '',
      name: '',
      agree: false
    }),
    validations: {
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(9)
      },
      name: {
        required
      },
      agree: {
        checked: v => v
      }
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        }

        try {
          await this.$store.dispatch('register', formData)
          this.$router.push('/')
        } catch (e) {
          console.log(e) 
        }

      }
    }
  }
</script>