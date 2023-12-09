<template>
  <div class="form-wrapper">
    <FormKit
      autocomplete="off"
      type="form"
      :value="{
        email: '',
        password: '',
      }"
      inner-class="form-inner"
      submit-label="Submit"
      @submit="handleSubmit"
    >
      <h1 class="title">Welcome Back</h1>

      <label
        ><p class="form-label">Email</p>
        <FormKit
          inner-class="form-inner"
          input-class="form-input"
          :classes="{
            inner: {
              $reset: true,
            },
            input: { $reset: true },
            outer: { $reset: true },
          }"
          type="email"
          name="email"
          validation="required|email|ends_with:.com"
          validation-visibility="none"
        />
      </label>

      <label
        ><p class="form-label">Password</p>
        <FormKit
          aria-autocomplete="false"
          inner-class="form-inner"
          input-class="form-input"
          :classes="{
            inner: {
              $reset: true,
            },
            input: { $reset: true },
            outer: { $reset: true },
          }"
          type="text"
          name="password"
          validation="required"
          validation-visibility="none"
      /></label>
    </FormKit>

    <p class="link-wrapper">
      Do not have an account?
      <RouterLink class="link" to="/signup">Register</RouterLink>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    handleSubmit(data) {
      this.$store.dispatch("SignIn", data);
    },
  },
};
</script>

<style>
@import "../styles/formStyles.css";
</style>
