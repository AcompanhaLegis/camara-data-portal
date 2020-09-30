<template>
  <logo-card>
    <a-form :form="registerForm" @submit.prevent="register">
      <a-form-item label="Email" has-feedback>
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: 'Formato de e-mail inválido!'
                },
                {
                  required: true,
                  message: 'O campo de email é obrigatório!'
                }
              ]
            }
          ]"
          placeholder="Email"
        />
      </a-form-item>

      <a-form-item label="Senha" has-feedback>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: 'Insira uma senha'
                },
                {
                  validator: validateToNextPassword
                }
              ]
            }
          ]"
          placeholder="Senha"
          type="password"
        />
      </a-form-item>

      <a-form-item label="Confirme a senha" has-feedback>
        <a-input
          v-decorator="[
            'confirmPassword',
            {
              rules: [
                {
                  required: true,
                  message: 'Confirme sua senha'
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            }
          ]"
          placeholder="Confirme a senha"
          type="password"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" block>
          Cadastrar
        </a-button>
      </a-form-item>
    </a-form>
  </logo-card>
</template>

<script>
import LogoCard from '@/components/website/LogoCard';

export default {
  auth: false,
  layout: 'default',
  components: {
    LogoCard
  },
  beforeCreate() {
    this.registerForm = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    register() {
      this.registerForm.validateFields(async (err, values) => {
        if (!err) {
          try {
            await this.$axios.post('/register/', values);

            this.$notification.success({
              message: 'Cadastro concluído com sucesso.',
              description: 'Você será redirecionado em instantes!'
            });

            setTimeout(() => {
              this.$router.push('/login');
            }, 2000);
          } catch (err) {
            this.loading = false;
            if (err.response?.status === 400 && err.response.data?.email) {
              this.$notification.error({
                message: 'Usuário já cadastrado',
                description: 'Este e-mail já foi cadastro no sistema!'
              });
              return;
            }
            this.$notification.error({
              message: 'Erro',
              description:
                'Nāo foi possível realizar seu cadastro no momento, por favor, tente novamente!'
            });
          }
        }
      });
    },
    compareToFirstPassword(rule, value, validationCb) {
      if (value && value !== this.registerForm.getFieldValue('password')) {
        validationCb('Suas senhas nāo conferem!');
      } else {
        validationCb();
      }
    },
    validateToNextPassword(rule, value, validationCb) {
      if (value && this.confirmDirty) {
        this.registerForm.validateFields(['confirmPassword'], { force: true });
      }
      validationCb();
    }
  }
};
</script>
