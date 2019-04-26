
<template>
    <div id="app">
        <dashboard-header/> 

        <div class="responsive-component" v-responsive= "{
        small: el => el.width < 860
        }">
        <body class="dashboard">

            <div class="container" id="dashboard">   
 
                <!-- This section is reserved for the profile information -->
                <div id="main">
                    <div class="container" id="name-location">

               
                        <div class="d-flex justify-content-center" id="company-name">
                            <h1 style="text-align:center:">{{ this.companyName }}</h1>
                        </div>
                            <div class="d-flex justify-content-center" id="company-location">
                            <h4 style="text-align:center:">Location: {{ this.companyLocation }}</h4>
                        </div>
                            <div class="d-flex justify-content-center" id="company-logo">
                            <div id= "logo-border">
                                <div class="circle" id="logo"></div>
                            </div>
                        </div>
                                                              
                    </div>

                    <!-- About Section -->
                    <div class="container" id="about">                
                        <div class="row">
                            <h4>About:</h4><p style="text-align:left"> {{ this.about }}</p>
                        </div>
                    </div>
                    
                </div>
                
                <br>
                <br>
                <!-- Stats Cards -->
                <div id="stats">
                    <div class="card-group">
                        <div class="card" style="min-width: 30%;">
                            <!-- <img src="..." class="card-img-top" alt="..."> -->
                            <div class="card-body">
                                
                                <h4 class="card-title">Page Views:</h4>
                                <p class="card-text">{{ this.pageViews }}</p>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                        <div class="card" style="min-width: 30%;">
                            <!-- <img src="..." class="card-img-top" alt="..."> -->
                            <div class="card-body">
                                
                                <h4 class="card-title">Leads:</h4>
                                <p class="card-text">{{ this.leads }}</p>
                                <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
                                <b-button block href="#"
                                    variant="outline-success"><h6>View Leads</h6></b-button>
                            </div>
                        </div>
                        <div class="card" style="min-width: 30%;">
                            <!-- <img src="..." class="card-img-top" alt="..."> -->
                            <div class="card-body">
                                
                                <h4 class="card-title">Pending Orders:</h4>
                                <p class="card-text">{{ this.credits }}</p>
                                <p class="card-text"><small class="text-muted">Orders link must be added</small></p>
                                <b-button block href="#"
                                    variant="outline-success"><h6>View Orders</h6></b-button>
                            </div>
                        </div>

                    </div>
                
                </div>
                <br>
                <br>
                <br>
            
                <div class="services">
                    <br>
                    <div id="services">
                        <h4> Services:</h4>
                    </div>
                    
                    <!-- Add message indicating no services have been added until services have been added -->
                    <div class="col-12">  
                    <!-- Modal component to add a service with -->
                    
                        <modal name="add-service"  height="auto" scrollable="true" style="padding-top:80px">
                            
                            <div class="container" style="margin:10px">
                                <div class="row">
                                    <div class="col-12">
                                        <h4 class="heading"> <strong>Add </strong> Service</h4>
                                        <br>
                                        <form id="add-service">
                                           
                                            <div class="container" style="min-width: 500px;">
                                            
                                                <!-- Service Title -->
                                                <div class="form-group row">
                                                    <label for="serviceTitle" class="col-sm .col-form-label-xsm"><p>Service Title:</p></label>
                                                    <div class="col-sm-10">
                                                        <input v-model="serviceTitle" type="text" class="form-control" placeholder="Enter service title">
                                                    </div>
                                                </div>
                                                <!-- Service Description -->
                                                <div class="form-group row">
                                                    <label for="serviceDescription" class="col-sm col-form-label"><p>General Service Description:</p></label>
                                                    <div class="col-sm-10">   
                                                        <textarea v-model="serviceDescription" type="text" rows="5" class="form-control animated" placeholder="Enter service description"></textarea>
                                                        
                                                    </div>
                                                </div> 
                                                <br>
                                                <!-- Service Tags -->
                                                <div class="form-group row">
                                                    <label for="serviceTags" class="col-sm col-form-label"><p>Tags:</p></label>
                                                    <div class="col-sm-10">   
                                                        <textarea v-model="serviceTags" type="text" rows="3" class="form-control animated" placeholder="Enter tags used to describe your service"></textarea>
                                
                                                    </div>
                                                </div>
                
                                                <!-- <br>
                                                <div class="form-group">
                                                    <label for="exampleFormControlSelect1"><p>How many sub-services would you like to add?</p></label>
                                                    <div class="col-sm-2">
                                                        <select class="form-control" id="exampleFormControlSelect1">
                                                        <option>0</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>             
                                                        <option>5</option>
                                                        <option>6</option>
                                                        <option>7</option>
                                                        <option>8</option>
                                                        <option>9</option>
                                                        <option>10</option>
                                                        </select>
                                                    </div>
                                                </div> -->
                                                <hr>
                                                <p>Add Subservice</p>
                                                <!-- If 1-10 entered, show... -->
                                                <div class="container hidden" id="subServiceBlock">
                                                    <!-- Service Subtitle -->
                                                    <div class="form-group row">
                                                        <label for="serviceSubtitle" class="col-sm col-form-label"><p>Service Subtitle:</p></label>
                                                        <div class="col-sm-8">
                                                            <input v-model="serviceSubtitle" type="text" class="form-control animated" placeholder="Enter service subtitle"></input>
                                                        </div>
                                                    </div> 
                                                    <!-- Enter Unit type -->
                                                    <div class="form-group row">
                                                        <label for="unitType" class="col-sm col-form-label"><p>Unit Type:</p></label>
                                                        <div class="col-sm-8">
                                                            <input v-model="unitType" type="text" class="form-control animated" placeholder="Enter unit type"></input>
                                                        </div>
                                                    </div> 
                                                    <!-- Service Price/ Unit --> 
                                                    <div class="form-group row">
                                                        <label for="price" class="col-sm col-form-label"><p>Price Per Unit:</p></label>
                                                        <div class="col-sm-8">
                                                            <input v-model="price" type="text" class="form-control animated" placeholder="Enter price per unit"></input>
                                                        </div>
                                                    </div> 
                                                    <!-- Turn Around Time -->
                                                    <div class="form-group row">
                                                    <label for="turnAroundTime" class="col-sm col-form-label"><p>Turn Around Time:</p></label>
                                                        <div class="col-sm-8">
                                                            <input v-model="turnAroundTime" type="text" class="form-control animated" placeholder="Enter turn around time in weeks"></input>
                                                        </div>
                                                    </div> 
                                                </div>
                                            
                                                <!-- Add another (plus button) -->

                                                <button type="button" class="btn btn-default pull-right" id="addSubButton" @click="addSubService">
                                                    <strong> <h6>Add Sub-service  <span class="glyphicon glyphicon-plus-sign"></span> </h6></strong>
                                                </button>                                              
                                            
                                                <!-- File Input -->
                                                <div class="form-group row">
                                                    <div class="col">
                                                    <p><input type="file" class="form-control-file" id="exampleFormControlFile1"></p></div>
                                                </div>
                                                <button 
                                                    class="btn btn-info pull-right" 
                                                    style="margin-top:10px" 
                                                    type="button"
                                                    @click="submitService">
                                                    <p>Submit</p>
                                                </button>
                                            </div>     

                                        </form>
                                    </div>
                                </div>
                            </div>
                           
                        </modal>  
                    
                        <br>

                        <div class="card" v-for="service in this.services" :key="service.title">
                            <h4 class="card-header" style="text-align:left; text-indent:15px;">{{ service.title }}</h4>
                            <div class="card-body">
                                <!-- Service Description -->
                                <h6><a href="#" class="btn pull-right">Edit</a></h6>
                                <h5 class="card-text" style="text-align:left; padding:15px;">{{ service.description }}</h5>

                                <!-- Service/Price Listings -->
                                <div class="container" id="price-chart">
                                    <p>
                                        <table class="table table-hover" >
                                        <thead>
                                            <tr>
                                                <th scope="col">Service Subtitle</th>
                                                <th scope="col">Turn Around Time</th>
                                                <th scope="col">Price/ Unit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Service1</th>
                                                <td>TT1</td>
                                                <td>P1</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Service2</th>
                                                <td>TT2</td>
                                                <td>P2</td>
                                            </tr>

                                        </tbody>
                                        </table>
                                    </p>
                                </div>                              
                            
                            </div>
                        </div>

                        <!-- Add Service Button -->
                        <br>
                        <button type="button" class="btn btn-default pull-right btn-add-service" @click="addService">
                            <strong> <h6>Add Service  <span class="glyphicon glyphicon-plus-sign"></span> </h6></strong>
                        </button>
                    <br><br>
                    <br>
                    </div> 
                </div>

            </div>
        </body>       
        </div>

    </div>
</template>

<script src="./scripts/dashboard.js"; >
</script>

<style scoped>
    @import '../assets/css/dashboard.css';
    @import url('https://fonts.googleapis.com/css?family=Lato|Roboto');
</style>