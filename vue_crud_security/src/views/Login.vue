<script setup>
import { onMounted, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useAuthStore } from '@/stores/useAuth';
import router from '@/router';
import { JSEncrypt } from 'jsencrypt';

const authStore = useAuthStore();

const $q = useQuasar();

const username = ref(null);
const password = ref(null);

const onSubmit = async () => {
  try {
    // RSA 암호화 진행 start
    const pw = password.value; // ref 변수에 접근
    const publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsX5yaeJtdoEywizKBICF5Ivzl64pLKgmN3ww4aB4M3Eyoe/xUeflYxC6fSn2IC/TR9DiDqssdywWvm8BYnZKPbRfkqC4NUt7EI/vIdRPeAaxYqhEmBySrr8GcUHjP8oPAwxPS65n7n/1I0hklbAJpjdF+tXV+axVLLNtS8hkD64Yy0JM7Q2oHqtfoutmF1JlxGV4wbpXxVvFvd8vSLbEQYdGyepF/KEMA3H/bgm/M67SRbQ3SXLHtiDkVIr93QfXKmhwCb9BJdACUeAZPxKBuCvoCc0RGLb5ZTExzst8gId8hy5jsrXUEZ5lV+/qcLb/+zmDrcthlvJDrZ4nljYJ6QIDAQAB";
    // JSEncrypt 객체 생성
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    // 비밀번호를 RSA로 암호화
    const encryptedData = encryptor.encrypt(pw);
    // RSA암호화 진행 end
    await authStore.login(username.value, encryptedData);
  } catch (error) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: error
    });
  }
};

onMounted(() => {
  if (authStore.user?.token) {
    router.push('/employees');
  }
});

watch(
  () => authStore.user?.token,
  (token) => {
    if (token) {
      router.push('/employees');
    }
  }
);
</script>

<template>
  <div class="window-height window-width row justify-center items-center">
    <q-card flat bordered class="q-pa-md" style="width: 360px">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section class="q-mb-none">
          <div class="text-h6 text-center">로그인</div>
        </q-card-section>
        <q-card-section class="q-mb-none q-gutter-y-lg">
          <q-input
            filled
            type="text"
            v-model="username"
            label="ID *"
            hint="for test: edu"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type username(ID)']"
          />
          <q-input
            filled
            type="password"
            v-model="password"
            label="Password *"
            hint="for test: edu1234"
            lazy-rules
            :rules="[(val) => (val !== null && val !== '') || 'Please type your password']"
          />
          <q-btn
            type="submit"
            unelevated
            color="primary"
            size="lg"
            class="full-width"
            label="Login"
            :disable="!username || !password"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>
