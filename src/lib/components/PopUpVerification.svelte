
<script>
    import { Flex, Stack, Avatar, Frame } from 'azucar-ui';
  let { open = $bindable(false), message, onConfirm } = $props();
  let dialogEl = $state(); 
  import { Button } from 'azucar-ui';


  $effect(() => {
    if (open) {
      dialogEl.showModal();
    } else {
      dialogEl.close();
    }
  });

  function confirm() {
    onConfirm();
    open = false;
  }

  function cancel() {
    open = false;
  }
</script>


<dialog bind:this={dialogEl} onclose={cancel}>
    <h4>{message}</h4>
    <Button onclick={confirm}>Oui</Button>
    <Button onclick={cancel}>Annuler</Button>
</dialog>

<style>
dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  border-color: border-focus;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  background: bg-subtle;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.8);
}

dialog h4 {
    text-align: left; 
  }
dialog {
    text-align: right; 
  }
</style>
