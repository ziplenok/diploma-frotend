<template>
  <Paginate
    v-model="currentPageNumber"
    :page-count="pageCount"
    :click-handler="clickCallback"
    :margin-pages="3"
    :prev-text="'<'"
    :next-text="'>'"
    :container-class="'pagination'"
    :page-class="'page-item'"
    :page-link-class="'page-link'"
    :active-class="'active-page'"
    :hide-prev-next="true"
  ></Paginate>
</template>
<script setup>
import { toRefs, ref, onBeforeMount } from "vue";
import Paginate from "vuejs-paginate-next";
/*
	props
*/
const props = defineProps({
  currentPage: Number,
  pageCount: Number,
});

/*
	refs
*/
const { currentPage: onCurrentPage } = toRefs(props);
const currentPageNumber = ref(onCurrentPage.value);

/*
	emits
*/
const emit = defineEmits(["set-currentpage"]);

const clickCallback = () => {
  console.log(
    "Call Back Triggered",
    `Current Page - ${currentPageNumber.value}`
  );
  emit("set-currentpage", currentPageNumber.value);
};
</script>
<style lang="scss">
.pagination {
  background: transparent;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
  border: none;
  box-sizing: border-box;
  overflow: hidden;
  justify-content: center;
}

.page-item {
  display: flex;
  cursor: pointer;
  margin-bottom: 0px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
   supported by Chrome, Edge, Opera and Firefox */
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.page-link {
  color: #666b85;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 800;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  &:hover {
    color: #333333;
    background-color: rgba(9, 20, 114, 0.2);
    border: none;
  }
}

.active-page {
  background-color: white !important;
  color: white !important;
  &:hover {
    border: none;
  }
}

.disabled {
  .page-link {
    background-color: rgba(9, 20, 114, 0.2);
  }
  cursor: not-allowed;
}
</style>
