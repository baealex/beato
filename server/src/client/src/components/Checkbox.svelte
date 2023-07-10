<script lang="ts">
    export let name: string = "";
    export let label: string = "";
    export let checked: boolean;
    export let onChange: (e: Event) => void;
</script>

<label class="checkbox-wrapper">
    <input type="checkbox" {name} {checked} on:change={onChange} />
    <div class="checkbox" />
    {label}
</label>

<style lang="scss">
    @import "../styles/var.scss";

    .checkbox-wrapper {
        font-size: 1rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #333;

        input {
            display: none;
        }

        .checkbox {
            width: 1rem;
            height: 1rem;
            border: 1px solid #555;
            border-radius: 0.25rem;
            background-color: #000;
        }

        input:checked + .checkbox {
            border-color: $PRIMARY_COLOR;
            background-color: $PRIMARY_COLOR;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23fff' d='M9.172 16.172a.5.5 0 0 1-.707 0L4.5 12.207l1.414-1.414L9.172 13.58l7.88-7.88 1.414 1.414z'/%3E%3C/svg%3E");
        }
    }
</style>
