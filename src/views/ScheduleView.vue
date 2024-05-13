<template>
  <div class="schedules">
    <b-button variant="primary" class="btn" @click="showModal"
      >Add schedule</b-button
    >

    <b-modal ref="my-modal" hide-footer>
      <div>
        <b-form @submit.prevent="submitForm">
          <b-form-group label="Nama Jadwal:" label-for="name-input">
            <b-form-input
              id="name-input"
              v-model="formData.name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Hari:" label-for="day-input">
            <b-form-select
              id="day-input"
              v-model="formData.day"
              :options="days"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group label="Jam Masuk:" label-for="checkin-input">
            <b-form-timepicker
              id="checkin-input"
              v-model="formData.checkIn"
              required
            ></b-form-timepicker>
          </b-form-group>
          <b-form-group
            label="Jam Keluar Istirahat:"
            label-for="breakout-input"
          >
            <b-form-timepicker
              id="breakout-input"
              v-model="formData.breakOut"
              required
            ></b-form-timepicker>
          </b-form-group>
          <b-form-group label="Jam Masuk Istirahat:" label-for="breakin-input">
            <b-form-timepicker
              id="breakin-input"
              v-model="formData.breakIn"
              required
            ></b-form-timepicker>
          </b-form-group>
          <b-form-group label="Jam Pulang:" label-for="checkout-input">
            <b-form-timepicker
              id="checkout-input"
              v-model="formData.checkOut"
              required
            ></b-form-timepicker>
          </b-form-group>
          <b-button
            type="submit"
            variant="primary"
            class="submit"
            @click="hideModal"
            >Submit</b-button
          >
        </b-form>
      </div>
    </b-modal>

    <b-table :items="schedules" :fields="fields">
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
          <b-form-group label="Nama Jadwal:" label-for="name-input">
            <b-form-input
              id="name-input"
              v-model="formData.name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Hari:" label-for="day-input">
            <b-form-select
              id="day-input"
              v-model="formData.day"
              :options="days"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group label="Jam Masuk:" label-for="checkin-input">
            <b-form-timepicker
              id="checkin-input"
              v-model="formData.checkIn"
              required
            ></b-form-timepicker>
          </b-form-group>
          <b-form-group
            label="Jam Keluar Istirahat:"
            label-for="breakout-input"
          >
            <b-form-timepicker
              id="breakout-input"
              v-model="formData.breakOut"
              required
            ></b-form-timepicker>
          </b-form-group>
          <b-form-group label="Jam Masuk Istirahat:" label-for="breakin-input">
            <b-form-timepicker
              id="breakin-input"
              v-model="formData.breakIn"
              required
            ></b-form-timepicker>
          </b-form-group>
          <b-form-group label="Jam Pulang:" label-for="checkout-input">
            <b-form-timepicker
              id="checkout-input"
              v-model="formData.checkOut"
              required
            ></b-form-timepicker>
          </b-form-group>
          <b-button
            type="submit"
            variant="primary"
            class="submit"
            @click="hideModalUpdate"
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
      schedules: [],
      fields: [
        { key: "Id", label: "ID" },
        { key: "Name", label: "Name" },
        { key: "Day", label: "Day" },
        { key: "CheckIn", label: "Check In" },
        { key: "BreakOut", label: "Break Out" },
        { key: "BreakIn", label: "Break In" },
        { key: "CheckOut", label: "Check Out" },
        { key: "actions", label: "Actions" },
      ],
      formData: {
        id: "",
        name: "",
        day: "",
        checkIn: "",
        breakOut: "",
        breakIn: "",
        checkOut: "",
      },
      days: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      axios
        .get(API_URL + "/api/Schedules")
        .then((response) => {
          this.schedules = response.data;
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    },
    editItem(item) {
      axios
        .get(`${API_URL}/api/Schedules/${item.Id}`)
        .then((response) => {
          this.formData.id = response.data[0].Id;
          this.formData.name = response.data[0].Name;
          this.formData.day = response.data[0].Day;
          this.formData.checkIn = response.data[0].CheckIn;
          this.formData.breakOut = response.data[0].BreakOut;
          this.formData.breakIn = response.data[0].BreakIn;
          this.formData.checkOut = response.data[0].CheckOut;
        })

        .catch((error) => {
          console.error("Terjadi kesalahan", error);
        });
    },
    deleteItem(item) {
      axios
        .delete(`${API_URL}/api/Schedules/${item.Id}`)
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
      axios
        .post(`${API_URL}/api/Schedules`, this.formData)
        .then((response) => {
          this.fetchPosts();
          alert(response.data);
        })
        .catch((error) => {
          alert(error)
          console.log("terjadi kesalahan", error);
        });
    },

    submitUpdateForm() {
      axios
        .put(`${API_URL}/api/Schedules/${this.formData.id}`, this.formData)
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
