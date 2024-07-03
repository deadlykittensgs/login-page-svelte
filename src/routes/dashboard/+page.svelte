<script>
  import { db } from "../../lib/firebase/firebase";
  import { authHandlers, authStore } from "../../store/store";
  import { getDoc, doc, setDoc } from "firebase/firestore";
  import TodoItem from "../../components/TodoItem.svelte";

  let todoList = [];
  let currTodo = "";
  let error = false;

  authStore.subscribe((curr) => {
    todoList = curr.data.todos;
  });

  function addTodo() {
    error = false;
    if (currTodo === "") {
      error = true;

      return;
    }
    todoList = [...todoList, currTodo];
    currTodo = "";
  }

  function editTodo(index) {
    let newTodoList = [...todoList].filter((val, i) => {
      return i !== index;
    });
    currTodo = todoList[index];
    todoList = newTodoList;
  }

  function removeTodo(index) {
    let newTodoList = [...todoList].filter((val, i) => {
      return i !== index;
    });
    todoList = newTodoList;
  }
  async function saveTodos() {
    try {
      console.log("saved");
      const userRef = doc(db, "users", $authStore.user.uid);
      await setDoc(
        userRef,
        {
          todos: todoList,
        },
        { merge: true }
      );
    } catch (err) {
      console.log("There was an error saving your information", err);
    }
  }
</script>

{#if !$authStore.loading}
  <div class="mainContainer">
    <div class="headerContainer">
      <h1>Todo List</h1>
      <div class="headerBtns">
        <button on:click={saveTodos}
          ><i class="fa-regular fa-floppy-disk"></i>
          <p>Save</p></button
        >
        <button on:click={authHandlers.logout}
          ><i class="fa-solid fa-arrow-right-from-bracket"></i>
          <p>Logout</p></button
        >
      </div>
    </div>

    <main>
      {#if todoList.length === 0}
        <p>You have nothing to do!</p>
      {/if}
      {#each todoList as todo, index}
        <TodoItem {todo} {index} {removeTodo} {editTodo} />
      {/each}
    </main>

    <div class={error ? "errorBorder enterTodo" : "enterTodo"}>
      <input bind:value={currTodo} type="text" placeholder="Enter Todo" />
      <button on:click={addTodo}>Add</button>
    </div>
  </div>
{/if}

<style>
  .mainContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    gap: 24px;
    padding: 24px;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
  }

  .headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .headerContainer button {
    background: #003c5b;
    color: white;
    padding: 10px 18px;
    border-radius: 5px;
    border: none;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .headerContainer button:hover {
    background-color: #0891b2;
    cursor: pointer;
  }

  .headerContainer button i {
    font-size: 1.2rem;
  }

  .headerBtns {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  main {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .todo {
    border-left: 1px solid cyan;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 1.3rem;
  }

  .actions i:hover {
    color: coral;
    cursor: pointer;
  }

  .enterTodo {
    display: flex;
    align-items: stretch;
    border: 1px solid #0891b2;
    border-radius: 5px;
    overflow: hidden;
  }

  .errorBorder {
    border-color: coral !important;
  }

  .enterTodo input {
    background: transparent;
    border: none;
    padding: 14px;
    color: white;
    flex: 1;
  }

  .enterTodo input:focus {
    outline: none;
  }

  .enterTodo button {
    padding: 0 28px;
    background: #003c5b;
    border: none;
    color: cyan;
    font-weight: 600;

    cursor: pointer;
  }

  .enterTodo button:hover {
    background: transparent;
  }
  .nothingToDO {
    display: flex;
    text-align: center;
    justify-content: center;
    font-size: 1.2rem;
  }
</style>
