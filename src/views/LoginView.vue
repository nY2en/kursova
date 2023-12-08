<template>
  <div>
    <FormKit
      type="form"
      :value="{
        email: '',
        password: '',
      }"
      submit-label="Submit"
      @submit="handleSubmit"
    >
      <p>Loginization</p>

      <FormKit
        type="email"
        name="email"
        help="Please enter your email address."
        validation="required|email|ends_with:.com"
        validation-visibility="blur"
        placeholder="Email"
      />

      <FormKit
        type="text"
        name="password"
        help="Please enter password address."
        validation="required"
        validation-visibility="blur"
        placeholder="Password"
      />

      <p>
        Do not have an account?
        <RouterLink to="/signup">Sign Up</RouterLink>
      </p>
    </FormKit>
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
.formkit-wrapper {
  text-align: center;
}
</style>
