<template>
  <div>
    <q-tabs
      align="justify"
      color="primary"
      inverted
    >
      <q-route-tab
        slot="title"
        icon="all inclusive"
        to="/"
        replace
        default
        exact
        ion
        label="Home"
      />
      <q-route-tab
        slot="title"
        icon="account balance wallet"
        to="/Orders"
        replace
        exact
        label="Orders"
      />
      <q-route-tab
        slot="title"
        icon="spa"
        to="/Charts"
        replace
        exact
        label="Charts"
      />
      <q-route-tab
        slot="title"
        icon="receipt"
        to="/Analysis"
        replace
        exact
        label="Analysis"
      />
    </q-tabs>
  </div>
</template>

<script>

export default {
  name: 'NavigationTabs',
  data() {
    return {};
  },
  computed: {
  },
};
</script>

<style>
</style>
