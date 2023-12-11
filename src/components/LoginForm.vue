<template>
  <div class="form-main-wrapper">
    <FormKit
      autocomplete="off"
      type="form"
      :value="{
        email: '',
        password: '',
      }"
      @submit="handleSubmit"
    >
      <h1 class="form-main-title">Welcome Back</h1>

      <label>
        <p class="form-main-label">Email</p>
        <FormKit
          input-class="form-main-input"
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
        ><p class="form-main-label">Password</p>
        <FormKit
          input-class="form-main-input"
          :classes="{
            inner: {
              $reset: true,
            },
            input: { $reset: true },
            outer: { $reset: true },
            suffixIcon: { $reset: true },
            icon: { $reset: true },
          }"
          icon-class="form-main-icon"
          type="password"
          name="password"
          validation="required"
          validation-visibility="none"
          suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick"
      /></label>
    </FormKit>

    <p class="form-main-link-wrapper">
      Do not have an account?
      <RouterLink class="form-main-link" to="/signup">Register</RouterLink>
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
