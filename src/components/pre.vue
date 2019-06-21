<template>
    <div class="tab-content" ref='content'>
            	<div class="tab-pane" id="tabPres1">
				    <el-table
				      	:data="tableData"
								border
								stripe
								ref='tables'>
				      	<el-table-column
				        	label="操作"
									align='center'
									width='120px'>
									<template slot-scope='scope'>
										<el-button class="delete" type='text'><i class="el-icon-delete"></i></el-button>
										<el-button class="Add" @click="btnAdd(scope.$index)" type='text'><i class="el-icon-plus"></i></el-button>
									</template>
				      	</el-table-column>
				      	<el-table-column
								align='center'
								 type="selection"
								width='50px'>
				      	</el-table-column>
				      	<el-table-column
				        	label="大类"
									align='center'
									prop='val'
									width='120px'>
									<template slot-scope='scope' style='height:25px;'>
										<el-select v-model='scope.row.val'
										placeholder="请选择" 
										style='height:25px;'
									 	popper-class='aa'
										@keyup.enter.native='show($event,scope.$index)'>
										<el-option
											v-for="item in options"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
										</el-select>
									</template>	
				      	</el-table-column>
				      	<el-table-column
				      		label='名称'
									align='center'
									width='180px'>
									<template slot-scope='scope'>
										<ComboGrid
										valueField="itemid" 
										textField="name" 
										v-model="scope.row.value"
										:data="data"
										style='width:150px; height:25px'
										:panelStyle="{width:'500px'}"
										:editable="true"
										v-on:keyup.enter.native='show($event,scope.$index)'>
											<DataGrid slot="grid" :border="false">
												<GridColumn field="itemid" title="Item ID"></GridColumn>
												<GridColumn field="name" title="Name"></GridColumn>
												<GridColumn field="listprice" title="List Price" align="right"></GridColumn>
												<GridColumn field="unitcost" title="Unit Cost" align="right"></GridColumn>
												<GridColumn field="attr" title="Attribute" width="30%"></GridColumn>
												<GridColumn field="status" title="Status" align="center"></GridColumn>
											</DataGrid>
										</ComboGrid>
									</template>
				      	</el-table-column>
				      	<el-table-column
				      		label="规格"
							align='center'
							width='100px'>
				      	</el-table-column>
				      	 <el-table-column
				      		label="单位"
							align='center'
							width='80px'>
				      	</el-table-column>
				       	<el-table-column
				      		label="单次用量"
							align='center'
							prop='consumption'
							width='90px'>
							<template slot-scope='scope'>
								<el-input type="text" style='width:60px; 
								text-align: center; height:25px;' 
								@keyup.enter.native="show($event,scope.$index)"
								v-model="tableData[scope.$index].consumption"/>
							</template>	
				      	</el-table-column>
				      	<el-table-column
				      		label="用量单位"
							align='center'
							width='90px'>
				      	</el-table-column>
				      	<el-table-column
				      		label="频次"
							align='center'
							prop='pc'
							width='100px'>
							<template slot-scope='scope'>
								<el-select v-model="scope.row.pc" filterable  
									placeholder="请选择"
									popper-class='aa'
									@keyup.native='show($event,scope.$index)'>
									<el-option
										v-for="v in frequency"
										:key="v.value"
										:label="v.label"
										:value="v.value">
									</el-option>
								</el-select>
							</template>	
				       </el-table-column>
				      <el-table-column
				      		label="途径"
							align='center'
							prop='tj'
							width='100px'>
							<template slot-scope='scope'>
								<el-select v-model="scope.row.tj" filterable  
									popper-class='aa'
									@keyup.native='show($event,scope.$index)'
									placeholder="请选择">
									<el-option
										v-for="it in channel"
										:key="it.value"
										:label="it.label"
										:value="it.value">
									</el-option>
								</el-select>
							</template>	
				        </el-table-column>
					    <el-table-column
					      	label="天数"
							align='center'
							width='60px'>
					      	<template slot-scope='scope'>
				      			<el-input type="text" style='
									text-align: center; height:25px;'
									class="pretpcustor"
									@keyup.enter.native="show($event,scope.$index)" 
									v-model='scope.row.day'/>
							</template>	
					    </el-table-column>
						<el-table-column
				      		label="数量"
							align='center'
							width='60px'>
				      		<template slot-scope='scope'>
				      			<el-input type="text" style=' 
									text-align: center; height:25px;'
									name='number'
									@keyup.enter.native="show($event,scope.$index)" 
									v-model='scope.row.num'/>
							</template>	
				        </el-table-column>
						<el-table-column
				      		label="单价"
							prop='price'
							align='center'
							width='60px'>
				        </el-table-column>
				        <el-table-column
				      		label="金额"
							prop='sum'
							align='center'
							width='60px'>
				        </el-table-column>
				        <el-table-column
				      		label="是否治疗"
							align='center'
							prop="val1"
							width='100px'>
							<template slot-scope='scope'>
								<el-select v-model="scope.row.val1" placeholder="请选择">
									<el-option
										v-for="val in byo"
										:key="val.value"
										:label="val.label"
										:value="val.value">
									</el-option>
								</el-select>   
							</template>
				        </el-table-column>
				        <el-table-column
				      		label="是否自带药"
							align='center'
							prop='val2'
							width='100px'>
							<template slot-scope='scope'>
								<el-select v-model="scope.row.val2" placeholder="请选择">
									<el-option
										v-for="items in treatment"
										:key="items.value"
										:label="items.label"
										:value="items.value">
									</el-option>
								</el-select>
							</template>	
				        </el-table-column>
				    </el-table>
            	</div>
           </div>
</template>
<script>
    export default {
        data () {
            return {
                tableData: [],
						options:[{
						value: '选项1',
						label: '全部'
					},
					{
						value: '选项2',
						label: '西药费'
					},
					{
						value: '选项3',
						label: '中成药(西)'
					},
					{
						value: '选项4',
						label: '一般诊疗费'
					}],
					frequency:[{
						value: 0,
						label: '全部'
					},
					{
						value: 1,
						label: '西药费'
					},
					{
						value: 2,
						label: '中成药(西)'
					},
					{
						value: 3,
						label: '一般诊疗费'
					}],
					channel:[{
						value: 1,
						label: '全部'
					},
					{
						value: 2,
						label: '西药费'
					},
					{
						value: 3,
						label: '中成药(西)'
					},
					{
						value: 4,
						label: '一般诊疗费'
					}],
				byo:[
					{
						value: 1,
						label: '是'
					},
					{
						value: 0,
						label: '否'
					}
				],		
			treatment:[{
						value:1,
						label: '是'
					},
					{
						value: 0,
						label: '否'
				}],
			data: [{
	         code: "FI-SW-01",
	         name: "Koi",
	         unitcost: 10.0,
	         status: "P",
	         listprice: 36.5,
	         attr: "Large",
	         itemid: "EST-1"
	       },
	       {
	         code: "K9-DL-01",
	         name: "Dalmation",
	         unitcost: 12.0,
	         status: "P",
	         listprice: 18.5,
	         attr: "Spotted Adult Female",
	         itemid: "EST-10"
	       },
	       {
	         code: "RP-SN-01",
	         name: "Rattlesnake",
	         unitcost: 12.0,
	         status: "P",
	         listprice: 38.5,
	         attr: "Venomless",
	         itemid: "EST-11"
	       },
	       {
	         code: "RP-SN-01",
	         name: "Rattlesnake",
	         unitcost: 12.0,
	         status: "P",
	         listprice: 26.5,
	         attr: "Rattleless",
	         itemid: "EST-12"
	       },
	       {
	         code: "RP-LI-02",
	         name: "Iguana",
	         unitcost: 12.0,
	         status: "P",
	         listprice: 35.5,
	         attr: "Green Adult",
	         itemid: "EST-13"
	       },
	       {
	         code: "FL-DSH-01",
	         name: "Manx",
	         unitcost: 12.0,
	         status: "P",
	         listprice: 158.5,
	         attr: "Tailless",
	         itemid: "EST-14"
	       },
	       {
	         code: "FL-DSH-01",
	         name: "Manx",
	         unitcost: 12.0,
	         status: "P",
	         listprice: 83.5,
	         attr: "With tail",
	         itemid: "EST-15"
	       },
	       {
	         code: "FL-DLH-02",
	         name: "Persian",
	         unitcost: 12.0,
	         status: "P",
	         listprice: 23.5,
	         attr: "Adult Female",
	         itemid: "EST-16"
	        },
	        {
	          code: "FL-DLH-02",
	          name: "Persian",
	          unitcost: 12.0,
	          status: "P",
	          listprice: 89.5,
	          attr: "Adult Male",
	          itemid: "EST-17"
	        },
	        {
	          code: "AV-CB-01",
	          name: "Amazon Parrot",
	          unitcost: 92.0,
	          status: "P",
	          listprice: 63.5,
	          attr: "Adult Male",
	          itemid: "EST-18"
	        }],
          	}
       },
       mounted () {
       		this.init();
       },
       methods: {
       		//初始化数据
       		init () {
       			var data = {
					consumption: 0, //单次用量
					day: 1,    //天数
					num: 1,    //数量
					price: 0,  //单价
					sum: 0,		//金额
					val: '选项1',
					val1: 0,
					val2: 0,
					tj: 1,
					pc: 0
				};
				this.tableData.push(data);
       		},
       		btnAdd (index){ //新增一行
			 	this.init();
			 },
			show (e,index) {
				var el = e.target;
				var tb = this.$refs.tables.$el;
				var tbs = $(tb).bind('.el-table__body-wrapper').bind('table');
				var tab = tbs.find('.el-input__inner').index(el);
				var indexNext = tab + 1;
				if (e.keyCode == 13) {
					if ($(el).prop("name")!='number') {
						$(".aa").hide();
						$('.el-select__caret').removeClass('is-reverse');
						$(".el-input--suffix").removeClass("is-focus");
						tbs.find(".el-input__inner:eq(" + indexNext + ")").focus();
					} else {
						var idx = index + 1;
						if (index == tbs.find("tbody tr").length-1) {
							this.btnAdd(index);
							this.$nextTick(() => {
								tbs.find("tbody tr").eq(idx).find('td:eq(2) .el-input__inner').focus();	
							})
						} else {
							tbs.find("tbody tr").eq(idx).find('td:eq(2) .el-input__inner').focus();	
						}
						
					
					}
				}
			}
    	}
    }
</script>