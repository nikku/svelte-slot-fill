{#if fills.length === 0}
  <slot></slot>
{:else}
  <div class="mount" ref:mount></div>
{/if}

<style>
  .mount {
    display: none;
  }
</style>

<script>
  import store from './store';

  /**
   * A <Slot> with a given name mounts
   * matching <Fill> nodes once they become
   * available.
   *
   * It allows for default content to be shown
   * if there are no fills present.
   *
   * @example
   *
   * <Slot name="buttons">
   *   No buttons, sorry!
   * </Slot>
   */
  export default {
    store: () => store,
    oncreate() {
      var d = this._fragment.d;

      var self = this;


      this._fragment.d = function(detach) {
        d.call(this, detach);

        // unmount mounted <Fill> nodes with slot
        self.get().fills.forEach(function(fill) {
          fill.component._fragment.d(true);
        });
      };
    },
    onupdate({ changed, current, previous }) {
      if (changed.fills) {

        // destroy old <Fill> fragments
        (previous && previous.fills || []).forEach(function(fill) {
          fill.component._fragment.d(true);
        });

        // we mount new <Fill> nodes behind the <mount> ref
        // which serves as an invisible anchor
        const anchor = this.refs.mount;

        // mount new <Fill> fragments
        current.fills.forEach((fill) => {
          fill.component._fragment.m(anchor.parentNode, anchor);
        });
      }
    },
    computed: {
      fills: ({ $fills, name }) => {
        return $fills.filter(function(fill) {
          return fill.name === name;
        });
      }
    }
  }
</script>