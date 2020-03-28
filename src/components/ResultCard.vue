<template>
    <div class="col-12 col-sm-10 col-md-8 grid" id="resultGrid">
        <div class="grid-header">
            <h2 id="resultHeader">Result</h2>
            <i class="material-icons md-36 grid-icon">message</i>
        </div>
        <div class="grid-content">
            <slot><p>The result of encrypt/decrypt messages will be shown here.</p></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ResultCard",
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
    p{
        word-break: break-word;
    }
</style>