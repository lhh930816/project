<template>
     <div class="box">
      <div class="content-body">
        <div class="portlet-body">
          <form action="">
			  <el-button @click="addTab(editableTabsValue)">添加处方</el-button> 
			<el-tabs v-model="editableTabsValue" type="card" closable ref='tabs1'
				@tab-remove="removeTab"
				:before-leave="beforeLeaveTab">
				<el-tab-pane
				v-for="(item, index) in editableTabs"
				:key="item.id"
				:label="'处方'+(index + 1)"
				:name="item.id">
			<pre is='currentView' keep-alive></pre>
			</el-tab-pane>
			</el-tabs>
          </form>
        </div>
      </div>
    </div> 
    
</template>

<script>
import pre from '@/components/pre.vue'
export default {
	components: {
		currentView:pre
	},
  data () {
    return {
			editableTabsValue: '1',
			currentView:'pre',
			editableTabs: [
				{
					id: '1',
					view: pre
				}
			],
			tabIndex: 1,
			isTip : true
    	}
	 },
	 ready(){
		 
	 },
	 methods: {
		addTab (targetId) {
            let newTabId = ++this.tabIndex + '';
            this.editableTabs.push({
              id: newTabId,
              view: pre
            });
            this.isTip = false;
            this.editableTabsValue = newTabId;
          },
		removeTab(targetId) {
				let tabs = this.editableTabs;
				let activeId = this.editableTabsValue;
            if (activeId === targetId) {
              tabs.forEach((tab, index) => {		
                if (tab.id === targetId) {
                  let nextTab = tabs[index + 1] || tabs[index - 1];
                  if (nextTab) {
						activeId = nextTab.id;
					}
                  this.isTip = false;
                  this.editableTabsValue = activeId;
                }
              });
            }
			this.editableTabs = tabs.filter(tab => tab.id !== targetId);
			console.log(this.editableTabs.length)
			var box=this.$refs.tabs1.$el;
			if(this.editableTabs.length<=1){
				return false;
			}
		},
		beforeLeaveTab(){
            if(!this.isTip){
              this.isTip = true;
              return true;
			}
		}
	 }
}
</script>

<style lang="scss" scope>
*{
    padding: 0;
    margin: 0;
    outline: none;
    list-style: none;
}
.box{
	width: 1471px;
	margin: 0 auto;
	.nav li{
		float: left;
		text-align: center;
		cursor: pointer;
		border: 1px solid #ebeef5;
		a{
			cursor: pointer;
			padding: 10px 15px;
			display: inline-block;
		}
	}
	.tab-content {
		.el-table{
			.el-table__header{
				.has-gutter{
					color: #333333;
					th{
						padding: 3px 0;
					}
				}
			}
			.el-table__body{
				td{
					padding: 2px 0;
					.cell{
						button{
							padding: 0;
						}
						.el-input__inner{
							height: 25px;
							line-height: 25px;
						}
						i{
							line-height: 25px;
						}
						.ivu-select-selection {
							height: 26px;
							.ivu-select-input {
								height: 25px;
								line-height: 25px;
							}
							i{
								margin-top:-11px;
							}
						}
					}
				}
			}
		}
	}
}
// .el-select-dropdown{
// 	top: 150px !important;
// 	padding: 2px 0 !important;
// }
</style>
