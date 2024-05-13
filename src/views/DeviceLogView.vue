<template>
  <div class="schedules">
    <b-button variant="primary" class="btn" @click="showModal"
      >Add schedule</b-button
    >

    <b-modal ref="my-modal" hide-footer>
      <div>
        <b-form @submit.prevent="submitForm">
          <b-form-group
            label="Tanggal dan Waktu Log (LogTime):"
            label-for="logTimeInput"
          >
            <b-form-input
              id="logTimeInput"
              v-model="formData.logTime"
              type="datetime-local"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Tipe Log (Type):" label-for="typeInput">
            <b-form-select
              id="typeInput"
              v-model="formData.type"
              :options="typeOptions"
              required
            ></b-form-select>
          </b-form-group>

          <b-button type="submit" variant="primary" class="submit"
            >Submit</b-button
          >
        </b-form>
      </div>
    </b-modal>

    <b-table :items="deviceLogs" :fields="fields">
      <template v-slot:cell(actions)="row">
        <b-button
          @click="
            showModalUpdate();
            editItem(row.item);
          "
          variant="primary"
          style="margin-right: 5px"
          >Edit</b-button
        >
        <b-button @click="deleteItem(row.item)" variant="danger"
          >Delete</b-button
        >
      </template>
    </b-table>

    <b-modal ref="my-modal-update" hide-footer>
      <div>
        <b-form @submit.prevent="submitUpdateForm">
          <b-form-group
            label="Tanggal dan Waktu Log (LogTime):"
            label-for="logTimeInput"
          >
            <b-form-input
              id="logTimeInput"
              v-model="formData.logTime"
              type="datetime-local"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Tipe Log (Type):" label-for="typeInput">
            <b-form-select
              id="typeInput"
              v-model="formData.type"
              :options="typeOptions"
              required
            ></b-form-select>
          </b-form-group>

          <b-button type="submit" variant="primary" class="submit" @click="hideModalUpdate"
            >Submit</b-button
          >
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://localhost:5063";

export default {
  data() {
    return {
      deviceLogs: [],
      fields: [
        { key: "Id", label: "ID" },
        { key: "LogTime", label: "Log Time" },
        { key: "Type", label: "Type" },
        { key: "actions", label: "Actions" },
      ],
      formData: {
        id: "",
        logTime: "",
        type: "",
      },
      typeOptions: ["CheckIn", "BreakOut", "BreakIn", "CheckOut"],
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      axios
        .get(API_URL + "/api/DeviceLogs")
        .then((response) => {
          this.deviceLogs = response.data.map(item => {
            return {
              ...item,
              LogTime: new Date(item.LogTime).toLocaleString(),
            }
          });
      })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    },
    editItem(item) {
      axios
        .get(`${API_URL}/api/DeviceLogs/${item.Id}`)
        .then((response) => {
          (this.formData.id = response.data[0].Id),
            (this.formData.logTime = response.data[0].LogTime.split(
              "."
            )[0].slice(0, -3)),
            (this.formData.type = response.data[0].Type);
        })

        .catch((error) => {
          console.error("Terjadi kesalahan", error);
        });
    },
    deleteItem(item) {
      axios
        .delete(`${API_URL}/api/DeviceLogs/${item.Id}`)
        .then((response) => {
          this.schedules = response.data;
          this.fetchPosts();
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });

      alert("schedule successfully deleted");
    },
    submitForm() {
      this.formData.updatedOn = "";
      axios
        .post(`${API_URL}/api/DeviceLogs`, this.formData)
        .then((response) => {
          this.fetchPosts();
          alert(response.data);
        })
        .catch((error) => {
          alert(error);
          console.log("terjadi kesalahan", error);
        });
    },

    submitUpdateForm() {
      axios
        .put(`${API_URL}/api/DeviceLogs/${this.formData.id}`, this.formData)
        .then((response) => {
          this.fetchPosts();
          alert(response.data);
        })
        .catch((error) => {
          console.log("terjadi kesalahan", error);
        });

      for (let key in this.formData) {
        this.formData[key] = "";
      }
    },

    showModal() {
      for (let key in this.formData) {
        this.formData[key] = "";
      }

      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      this.$refs["my-modal"].toggle("#toggle-btn");
    },

    showModalUpdate() {
      this.$refs["my-modal-update"].show();
    },
    hideModalUpdate() {
      this.$refs["my-modal-update"].hide();
    },
    toggleModalUpdate() {
      this.$refs["my-modal-update"].toggle("#toggle-btn");
    },
  },
};
</script>

<style>
.schedules {
  padding: 20px;
}

.btn {
  margin-bottom: 10px;
}

.submit {
  margin-top: 10px;
}
</style>
