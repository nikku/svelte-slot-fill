<slot></slot>

<script>
  import store from './store';

  /**
   * Fill is a component that immediately
   * unmounts its DOM nodes upon creation.
   *
   * Its contents will be re-mounted in a
   * <Slot> with the same name, once it
   * becomes available.
   */
  export default {
    store: () => store,

    oncreate() {
      var d = this._fragment.d;
      var m = this._fragment.m;

      var destroyed = false;

      // guard against double destruction of
      // <Fill> fragment.
      this._fragment.m = function() {
        destroyed = false;

        m.apply(this, arguments);
      };

      this._fragment.d = function() {
        if (!destroyed) {
          destroyed = true;
          d.apply(this, arguments);
        }
      };

      // detach right after create;
      // we'll re-attach inside slot soon
      this._fragment.d(true);
    },

    onupdate({ changed, current }) {
      const uuid = this.uuid;

      if (changed.name) {

        const {
          name
        } = current;

        this.uuid = this.store.addFill({
          uuid,
          name,
          component: this
        });
      }
    },

    ondestroy() {
      const uuid = this.uuid;

      this.store.removeFill({
        uuid
      });
    }
  };
</script>