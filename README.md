# svelte-slot-fill

Slot/fill for [Svelte](https://svelte.technology/) apps.


## Usage

Define your slots as part of a component:

```html
<!-- Layout.html -->
<Slot name="buttons">
  No extra buttons, sorry!
</Slot>

<script>
  import { Slot } from 'svelte-slot-fill';

  export default {
    components: {
      Slot
    }
  };
</script>
```

Use `Layout` and fill the slot from another component:

```html
<!-- Fill.html -->
<Layout />

<Fill name="buttons">
  <button on:click="...">Click me!</button>
</Fill>

<script>
  import { Fill } from 'svelte-slot-fill';

  export default {
    components: {
      Fill,
      Layout: './Layout.html'
    }
  };
</script>
```


## License

MIT