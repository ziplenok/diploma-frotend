<template>
  <div
    v-if="showMobileNav"
    class="backdrop"
    @click="handleBackdropClick"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  ></div>
  <nav class="navbar sticky-top" aria-label="main navigation" role="navigation">
    <div class="container">
      <div class="navbar-brand">
        <RouterLink to="/" class="navbar-item mr-6">
          <img
            :src="logoIcon"
            alt="streamlet logo icon"
            class="mr-4 logo-icon"
          /><span> streamlet </span>
        </RouterLink>
        <a
          @click.prevent="showMobileNav = !showMobileNav"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-expanded="false"
          aria-label="menu"
          role="button"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        class="navbar-menu mobile-nav-container"
        :class="{ 'is-active': showMobileNav }"
      >
        <font-awesome-icon
          :icon="['fas', 'xmark']"
          class="close-icon"
          @click="closeModal"
        />

        <RouterLink
          to="/university"
          class="navbar-item mobile-flex"
          active-class="is-active"
        >
          <span class="icon mr-5 nav-icon">
            <img :src="universityIcon" alt="university icon" />
          </span>
          ВУЗы
        </RouterLink>
        <RouterLink
          to="/specialities"
          class="navbar-item mobile-flex"
          active-class="is-active"
        >
          <span class="icon mr-5 nav-icon">
            <img :src="specialityIcon" alt="speciality icon" />
          </span>
          Специальности
        </RouterLink>
        <RouterLink
          :to="{ name: 'calculator' }"
          class="navbar-item mobile-flex"
          active-class="is-active"
        >
          <span class="icon mr-5 nav-icon">
            <img :src="calculatorIcon" alt="calculator icon" />
          </span>
          Калькулятор
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
/*
imports
*/
import { ref } from "vue";
import universityIcon from "@/components/icons/UniversityIcon.svg";
import specialityIcon from "@/components/icons/SpecialityIcon.svg";
import calculatorIcon from "@/components/icons/CalculatorIcon.svg";
import logoIcon from "@/assets/logo.svg";
/*
mobile nav
*/

const showMobileNav = ref(false);

const closeModal = () => {
  showMobileNav.value = !showMobileNav.value;
};

const handleBackdropClick = () => {
  showMobileNav.value = false;
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.mobile-nav-container {
  @include touch {
    height: 100% !important;
    position: fixed !important ;
    top: 0 !important;
    right: 0 !important;
    background: rgba(23, 23, 23, 1) !important;
    overflow-x: hidden !important;
    padding: 3.25rem 1rem;
    min-width: 15rem;
    z-index: 9999 !important;
  }
}

.logo-icon {
  height: 28px;
  width: 28px;
}

.mobile-nav {
  @include touch {
    position: relative !important;
  }
}

// .navbar {
//   @include desktop {
//     overflow: hidden !important;
//   }
// }

.navbar-brand {
  @include touch {
    justify-content: space-between !important;
  }
}

.mobile-flex {
  @include touch {
    display: flex !important;
    align-items: center !important;
  }
}
.navbar-item {
  cursor: pointer;
  @include touch {
    border-radius: 7px !important;
  }
}

.close-icon {
  position: fixed;
  top: 0.4rem;
  right: 0.7rem;
  height: 32px;
  width: 32px;
  z-index: 9999 !important;
  @include desktop {
    display: none;
  }
}

.nav-icon {
  @include desktop {
    display: none;
  }
}

.backdrop {
  background: rgba(0, 0, 0, 0.46);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  outline: 0;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;

  @include desktop {
    display: none;
  }
}
</style>
