<template>
  <div class="modal-backdrop">
    <div class="modal">
      <!--  -->
      <div class="header"></div>
      <!--  -->
      <!--  -->
      <div class="body">
        <!-- Service title -->
        <!-- Selection  of quantity and thus price -->
        <div v-if="itemChosen != null">Service : TESTING
          <div>
            <input v-model="pickedQuantity" style="width: 30px">
          </div>
          <div>
            <input type="radio" id="one" value="1" v-model="pickedQuantity">
            <label for="one">One</label>
            <br>
            <input type="radio" id="two" value="2" v-model="pickedQuantity">
            <label for="two">Two</label>
            <br>
            <input type="radio" id="two" value="3" v-model="pickedQuantity">
            <label for="three">Three</label>
            <br>
          </div>
        </div>
        <br>
        <br>

        <div>
          Questions about this service ?
          <textarea v-model="inquiryText" style="width: 450px;"></textarea>

          <div class="submit-button" v-if="submitButtonThere">
            <button
              class="btn btn-info pull-left"
              style="margin-top:10px"
              type="button"
              @click="submitItemToCart()"
            >Submit</button>
          </div>
          <br>
          <br>
          <br>

          <button class="btn btn-info pull-right" style="margin-top:10px" type="button">Add To Cart</button>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemChosen: [1, 2], // TESTING
      pickedQuantity: 1,
      inquiryText: "",
      submitButtonThere: false
    };
  },
  mounted() {},
  methods: {},
  watch: {
    inquiryText: function(newValue) {
      if (newValue != "") {
        this.submitButtonThere = true;
        // make submit button appear
      } else {
        this.submitButtonThere = false;
        // make submit button disappear
      }
      console.log(
        `\nThe submit button should be there : ${this.submitButtonThere}\n`
      ); // TESTING
    }
  }
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  height: 75%;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  flex-direction: column;
}

.modal .header,
.modal .footer {
  border: 100px;
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal .body {
  background-color: green;
  /* position: relative; */
  /* padding: 10px 10px; */
}
</style>
