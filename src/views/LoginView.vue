<template>
  <div class="area">
    <div class="form-wrapper">
      <FormKit
        type="form"
        :value="{
          email: '',
          password: '',
        }"
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
            }"
            type="text"
            name="password"
            validation="required"
            validation-visibility="none"
        /></label>

        <p class="link-wrapper">
          Do not have an account?
          <RouterLink class="link" to="/signup">Register</RouterLink>
        </p>
      </FormKit>
    </div>
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
.area {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  color: white;

  background-image: url("../img/1981483.webp");
  background-repeat: no-repeat;
  background-size: cover;
}

.form-wrapper {
  width: 500px;
  height: 436px;
  margin: 0 auto;
  text-align: center;

  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 20px 50px;
  border-radius: 15px;
}

.title {
  font-size: 32px;
  font-weight: 400;
  color: #000;
  margin-bottom: 32px;
}

.form-label {
  text-align: start;
}

.form-input {
  width: 100%;
  padding: 20px;
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid black;
}

.form-input::placeholder {
  color: black;
}

.link-wrapper {
  color: #000;
}

.link {
  color: black;
  text-decoration: none;
  font-weight: 700;
}
</style>
