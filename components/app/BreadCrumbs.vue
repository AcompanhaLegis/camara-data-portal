<template>
  <div class="breadcrumb-container">
    <a-breadcrumb-item>
      <a href="/">
        <a-icon type="home" />
      </a>
    </a-breadcrumb-item>
    <a-breadcrumb>
      <a-breadcrumb-item v-for="crumb in crumbs" :key="crumb.path">
        <a :href="crumb.to">{{ crumb.text }}</a>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  computed: {
    crumbs() {
      const pathArray = this.$route.path.split('/');
      const breadcrumbs = pathArray
        .slice(1)
        .reduce((breadcrumbArray, path, idx) => {
          return [
            ...breadcrumbArray,
            {
              path,
              to: breadcrumbArray[idx - 1]
                ? '/' + breadcrumbArray[idx - 1].path + '/' + path
                : '/' + path,
              text: this.capitalizeFirstLetter(
                this.$route.matched[idx]?.meta.breadCrumb || path
              )
            }
          ];
        }, []);
      return breadcrumbs || [];
    }
  },
  methods: {
    capitalizeFirstLetter(text) {
      return `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;
    }
  }
};
</script>

<style lang="scss">
.breadcrumb-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 2.5rem 1.25rem 0 1.25rem;
  box-sizing: border-box;
}
</style>
