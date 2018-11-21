<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <!-- <q-toolbar
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
        color="primary"
      > -->
      <!-- <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn> -->

      <!-- <q-toolbar-title>
          Quasar App
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title> -->
      <!-- </q-toolbar> -->

      <NavigationTabs />

    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer>
      <Theme />
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import NavigationTabs from './NavigationTabs';
import Theme from './Theme';

export default {
  name: 'MyLayout',
  components: {
    NavigationTabs,
    Theme,
  },
  data() {
    return {
    };
  },
  methods: {
    openURL,
  },
};
</script>

<style>
</style>
