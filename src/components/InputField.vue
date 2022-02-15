<script>
import { useField } from 'vee-validate';

export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: null,
    },
    pattern: {
      type: String,
    },
    maxlength: {
      type: String,
    },
    minlength: {
      type: String,
    },
    successMessage: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    // we don't provide any rules here because we are using form-level validation
    // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    });

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
};
</script>

<template>
  <div class="flex flex-col gap-2 justify-center flex-auto">
    <label :for="name">{{ label }}</label>
    <input
      class="form-control"
      :class="{ 'bg-danger-100 ring-danger-500': errorMessage }"
      :name="name"
      :id="name"
      :type="type"
      :size="size"
      :pattern="pattern"
      :maxlength="Number.parseInt(maxlength)"
      :minlength="Number.parseInt(minlength)"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />

    <p class="text-danger-500" v-show="errorMessage || meta.valid">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>
