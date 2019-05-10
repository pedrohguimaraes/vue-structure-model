<template>
	<v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-4">
              	<v-toolbar
	              	class="elevation-0"
	              	color="transparent"
	              	dense>
            	<v-spacer></v-spacer>
	            <div class="text-xs-center">
	               	<img class="logo"
			        	src="/img/logo.png">
	            </div>
	            <v-spacer></v-spacer>
              	</v-toolbar>
              	<v-card-text>
                	<v-form ref="form">
                		<v-alert
			                v-if="getStatus === 'err'"
			                :value="true"
			                icon=""
			                outline
			                dismissible
			                color=""
			                class="mb-4">
			                {{getMessage}}
			            </v-alert>
			            <v-alert
			            	v-else-if="getStatus === 'success'"
			                :value="true"
			                icon=""
			                outline
			                dismissible
			                color="success"
			                class="mb-4">
			                {{getMessage}}
			            </v-alert>
                  		<v-text-field
			                label="Usuário"
			                autocomplete="off"
			                prepend-icon="mdi-account-circle"
			                v-model="form.username"
			                :disabled = "loading"
			                :rules="rules.username"
			                solo
			                autofocus>
		                </v-text-field>
                  		<v-text-field 
	                  		type="password"
			                label="Senha"
			                autocomplete="off"
			                prepend-icon="mdi-lock"
			                v-model="form.password"
			                :disabled = "loading"
			                :rules="rules.password"
			                solo>
			            </v-text-field>
                	</v-form>
              	</v-card-text>
              	<v-card-actions>
                	<v-btn 
                		color="primary"
                		:disabled="!formIsValid || loading"
                		:loading="loading"
                		@click.native="login"
                		block>
                			Login
                	</v-btn>
              	</v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  	export default {
    	data: () => ({
	  		form: {
	    		username: '',
	    		password: ''
	  		},
	    	loading: false,
	    	rules: {
	          	username: [
	           		val => (val || '').length > 0 || 'Campo Obrigatório'
	          	],
	          	password: [
	            	val => (val || '').length > 0 || 'Campo Obrigatório'
	          	]
	        }
      	}),
      	created (){
	    },
	    mounted (){
	    },
	  	computed: {
	      	formIsValid() {
		        return (
		          this.form.username &&
		          this.form.password
		        )
      		},
      		getStatus(){
		    	return this.$store.getters['user/status'];
		    },
		    getMessage(){
		    	return this.$store.getters['user/msg'];
		    }
	    },
	    methods: {
	      	async login(){
		        this.loading = !this.loading;
		        this.$store.dispatch('user/login', this.form)
		        .then(res => {
		            this.loading = !this.loading;
		            this.$router.push('/dashboard/home');	         
		        })
		        .catch(err => {
		          	this.loading = !this.loading;
		        })
		    }
	    }
  	}
</script>

<style  lang="scss">
  	.logo{
   		width: 90px;
    	height: 90px;
    	margin-bottom: 50px;
  	}
</style>