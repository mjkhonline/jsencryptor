<template>
    <div class="col-12 col-sm-10 mt-4 mt-md-0 col-md-4 grid" id="decryptionGrid">
        <div class="grid-header">
            <h2 id="decryptionCardHeader">Decryption</h2>
            <i class="material-icons md-36 grid-icon">lock_open</i>
            <p>Fill in below fields and click decrypt.</p>
        </div>
        <div class="grid-content">
            <form class="my-4" autocomplete="off" @submit.prevent="submit">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Ciphered Message</span>
                    </div>
                    <textarea class="form-control" aria-label="User Ciphered Text"
                              v-model="formInput.cipheredText"
                              :class="{'is-invalid':errors.cipheredText}"></textarea>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="IV"
                           aria-label="Initialization vector" v-model="formInput.iv"
                           :class="{'is-invalid':errors.iv}">
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Secret Key"
                           aria-label="Message Secret Key" v-model="formInput.key"
                           :class="{'is-invalid':errors.key}">
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Salt (optional)"
                           aria-label="Salt" v-model="formInput.salt">
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Authentication Tag (optional)"
                           aria-label="Authentication Tag" v-model="formInput.aad">
                </div>
                <div class="input-group">
                    <button type="submit" class="btn btn-lg btn-warning">
                        Decrypt <i class="material-icons md-18">lock_open</i>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DecryptionCard",
        data() {
            return {
                formInput: {
                    key: '',
                    iv: '',
                    salt: '',
                    aad: '',
                    cipheredText: ''
                },
                errors: {
                    key: false,
                    cipheredText: false,
                    iv: false,
                }
            }
        },
        methods: {
            submit() {
                /*for (let error in this.errors)
                    error = false;*/
                this.errors.key = false;
                this.errors.cipheredText = false;
                this.errors.iv = false;
                if (this.formValidation()) {
                    this.$emit('decryptionFormSubmitted', this.formInput);
                }
            },
            formValidation() {
                let valid = true;
                if (!this.formInput.key) {
                    this.errors.key = true;
                    valid = false;
                }
                if (!this.formInput.cipheredText) {
                    this.errors.cipheredText = true;
                    valid = false;
                }
                if (!this.formInput.iv) {
                    this.errors.iv = true;
                    valid = false;
                }
                return valid;
            },
            getFormData(cipheredText = '', iv = '', salt = '', aad = '') {
                this.formInput = {
                    iv, salt, aad, cipheredText,
                    key: this.formInput.key
                };

            }
        }
    }
</script>

<style lang="scss" scoped>
    textarea {
        resize: vertical;
        max-height: 200px;
        min-height: 100px;
    }
</style>