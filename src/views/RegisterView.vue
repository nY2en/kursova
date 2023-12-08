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
      <p>Registration</p>

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
        Already have an account?
        <RouterLink to="/signin">Sign In</RouterLink>
      </p>
    </FormKit>
  </div>
</template>

<script>
export default {
  methods: {
    handleSubmit(data) {
      this.$store.dispatch("SignUp", data);
    },
  },
};
</script>

<style>
.formkit-wrapper {
  text-align: center;
}
</style>
