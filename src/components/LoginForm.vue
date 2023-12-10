<template>
  <div class="form-wrapper">
    <FormKit
      autocomplete="off"
      type="form"
      :value="{
        email: '',
        password: '',
      }"
      @submit="handleSubmit"
    >
      <h1 class="title">Welcome Back</h1>

      <label>
        <p class="form-label">Email</p>
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
          inner-class="form-inner"
          input-class="form-input"
          :classes="{
            inner: {
              $reset: true,
            },
            input: { $reset: true },
            outer: { $reset: true },
            suffixIcon: { $reset: true },
            icon: { $reset: true },
          }"
          icon-class="form-icon"
          type="password"
          name="password"
          validation="required"
          validation-visibility="none"
          suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick"
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

    handleIconClick(node) {
      node.props.suffixIcon =
        node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
      node.props.type = node.props.type === "password" ? "text" : "password";
    },
  },
};
</script>

<style>
@import "../styles/formStyles.css";
</style>
