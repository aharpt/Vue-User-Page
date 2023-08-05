<script setup>
import {ref, watchEffect} from 'vue';
// import { getAllTableData } from '../services/getData';
// import { addUser } from '../services/setData';
// import {updateUser} from '../services/updateData';
// import {deleteUser} from '../services/deleteUser';
import {getAllUsers, addUser, updateUser, deleteUser} from '../services/userServices';

const tableData = ref([]);
const isAddingUser = ref(false);
const name = ref('');
const email = ref('');
const updateNameRef = ref(null);
const updateEmailRef = ref(null);

const retrieveTableData = async () => {
  tableData.value = await getAllUsers();
  tableData.value.forEach(record => {
    record.isBeingModified = false;
  });
}

watchEffect(async () => {
  await retrieveTableData();
});

// Add Users
const toggleAdd = async () => {
  if (isAddingUser.value) {
    await addUser(name.value, email.value);
    await retrieveTableData();
  }
  isAddingUser.value = !isAddingUser.value;
}

const clearUser = () => {
  isAddingUser.value = false;
}

// Edit User
const getCurrentIndex = (idx) => {
  const partialArray = tableData.value.slice(0, idx).filter(row => row.isBeingModified);

  return partialArray.length;
}


const updateRecord = async (index, id) => {
  tableData.value[index].isBeingModified = !tableData.value[index].isBeingModified;

  // If isBeingModified is now false, 'Submit' button was clicked
  if (!tableData.value[index].isBeingModified) {
    await updateUser(id, updateNameRef.value[getCurrentIndex(index)].value, updateEmailRef.value[getCurrentIndex(index)].value);
    await retrieveTableData();
  }
}

const deleteRecord = async (id) => {
    await deleteUser(id);
    await retrieveTableData();
}

</script>

<template>
<table>
  <tr>
    <td class="id">#</td>
    <td class="name">Name</td>
    <td class="email">Email</td>
    <td class="update">Update</td>
    <td class="delete">Delete</td>
  </tr>
  <tr v-for="(data, idx) in tableData" :key="idx">
    <td class="id">{{idx + 1}}</td>
    
    <td class="name" v-if="!data.isBeingModified">{{data.name}}</td>
    <td class="name" v-else><input ref="updateNameRef" type="text" :value="data.name" /></td>

    <td class="email" v-if="!data.isBeingModified" >{{data.email}}</td>
    <td class="email" v-else><input ref="updateEmailRef" type="text" :value="data.email" /></td>

    <td class="update"><button @click="() => updateRecord(idx, data.id)">{{data.isBeingModified ? 'Submit' : 'Update'}}</button></td>
    <td class="delete"><button @click="() => deleteRecord(data.id)">Delete</button></td>
  </tr>
  <tr v-if="isAddingUser">
    <td class="id">{{tableData.length + 1}}</td>
    <td class="name"><input v-model="name" type="text" /></td>
    <td class="email"><input v-model="email" type="text" /></td>
    <td class="update"><button>Update</button></td>
    <td class="delete"><button>Delete</button></td>
  </tr>

</table>
<div>
    <button id="addUser" @click="toggleAdd">{{isAddingUser ? 'Save' : 'Add'}} User</button>
    <button id="clearUser" @click="clearUser" v-if="isAddingUser">Clear</button>
  </div>
</template>

<style scoped>
/* Table Styles */
table {
  border: 1px solid gray;
}

tr:not(:last-child) td {
  border-bottom: 1px solid gray;
}

td {
  display: inline-block;
  padding: 0 15px 0 15px;
  height: 25px;
}

td:not(:last-child) {
  border-right: 1px solid gray;
}

/* Table Column Sizing */
.id {
  width: 30px;
}

.name {
  width: 50px;
}

.email {
  width: 150px;
}

.update,
.delete {
  width: 50px
}

/* Table Input Sizing */
input {
  max-width: 90%;
}

/* Buttons Styles */
div {
  margin-top: 10px;
}

#addUser {
  margin-right: 10px;
  margin-left: 190px;
}
</style>