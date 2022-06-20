<template>
  <h5 class="q-mb-lg"><b>IDE Settings</b></h5>
  <settingsdropdown
    class="q-mt-sm q-mb-sm"
    :description="'Editor theme'"
    :model="ideTheme"
    :options="ideThemeOptions">
    </settingsdropdown>
  <settingstoggle
    class="q-mt-sm q-mb-sm"
    :description="'Re-run application upon saving'"
    :model="rerunApp">
  </settingstoggle>
</template>

<script>
import SettingDropdown from 'src/components/SettingDropdown.vue';
import SettingsToggle from 'src/components/SettingsToggle.vue';

export default {
  name:"EditorSettingsPanel",
  components:{
    "settingsdropdown":SettingDropdown,
    "settingstoggle":SettingsToggle
  },
  data(){
    return {
      ideTheme:"VS Dark",
      ideThemeOptions:[
        'VS Dark', 'VS Light', 'One Dark Pro',  'Darcula'
      ],
      rerunApp:false
    }
  }
}
</script>

<style>

</style>
