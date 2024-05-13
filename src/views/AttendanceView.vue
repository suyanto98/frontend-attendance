<template>
  <div class="attendance">
    <b-button variant="primary" @click="openProcessModal" class="process-attendance">Process Attendance</b-button>

    <b-modal ref="processModal" hide-footer>
      <div>
        <b-form @submit.prevent="processAttendance">
        <b-form-group label="Dari Tanggal:" label-for="fromDate">
          <b-form-input id="fromDate" v-model="fromDate" type="date"></b-form-input>
        </b-form-group>
        <b-form-group label="Sampai Tanggal:" label-for="toDate">
          <b-form-input id="toDate" v-model="toDate" type="date"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" class="process">Process</b-button>
      </b-form>
      </div>
    </b-modal>

    <b-button @click="openDeleteProcessModal">Delete Attendance Process</b-button>

    <b-modal ref="deleteProcessModal" hide-footer>
      <div>
        <b-form @submit.prevent="deleteAttendaceProcess">
        <b-form-group label="Dari Tanggal:" label-for="fromDate">
          <b-form-input id="fromDate" v-model="fromDate" type="date"></b-form-input>
        </b-form-group>
        <b-form-group label="Sampai Tanggal:" label-for="toDate">
          <b-form-input id="toDate" v-model="toDate" type="date"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" class="process">Process</b-button>
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
      fromDate: '',
      toDate: ''
    };
  },
  methods: {
    openProcessModal() {
      this.$refs.processModal.show();
    },
    openDeleteProcessModal() {
      this.$refs.deleteProcessModal.show();
    },
    processAttendance() {
      axios
        .post(`${API_URL}/api/Attendances?startDate=${this.fromDate}&endDate=${this.toDate}`)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          alert(error);
        });
      this.$refs.processModal.hide();
    },
    deleteAttendaceProcess() {
      axios
        .delete(`${API_URL}/api/Attendances?startDate=${this.fromDate}&endDate=${this.toDate}`)
        .then(response => {
          alert(response.data);
        })
        .catch(error => {
          alert(error);
        })
      this.$refs.deleteProcessModal.hide();
    }
  }
};
</script>

<style scoped>
.attendance {
  padding: 20px;
}

.btn {
  margin-bottom: 10px;
}

.process {
  margin-top: 10px;
}

.process-attendance{
  margin-right: 10px;
}

</style>
