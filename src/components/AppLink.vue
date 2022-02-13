<script>
import { computed } from 'vue';
import { RouterLink, useLink } from 'vue-router';
export default {
  props: {
    ...RouterLink.props,
  },
  setup(props) {
    const { route, href, isActive, isExactActive, navigate } = useLink(props);
    const isExternalLink = computed(
      () => typeof props.to === 'string' && props.to.startsWith('http')
    );
    return { isExternalLink, href, navigate, isActive, route, isExactActive };
  },
};
</script>

<template>
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    rel="noopener"
    :href="to"
    target="_blank"
  >
    <slot />
  </a>
  <router-link
    v-else
    v-bind="$props"
    class="px-3 py-2 border-b-2 border-transparent font-medium text-gray-500 transition duration-300 ease-in-out"
    :class="
      isActive
        ? `border-primary-300 text-gray-900 focus:border-primary-700 hover:border-primary-700`
        : `text-gray-300 hover:text-gray-700 focus:text-gray-700 focus:border-gray-300 hover:border-gray-300`
    "
  >
    <slot />
  </router-link>
</template>
