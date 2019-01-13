<?php
/**
 * Wiki-Style Script - auxiliary plugin
 * Tells admins (managers and superusers) to install wikiformatstyling instead of wikistyle2html
 *
 * @license    GPL 2 (http://www.gnu.org/licenses/gpl.html)
 * @author     HokkaidoPerson <dosankomali@yahoo.co.jp>
 */

if(!defined('DOKU_INC')) die();


class action_plugin_wikistyle2html extends DokuWiki_Action_Plugin {

    public function register(Doku_Event_Handler $controller) {
        $controller->register_hook('DOKUWIKI_STARTED', 'BEFORE', $this, 'alert', array());
    }

    public function alert(Doku_Event $event, $param) {
        $message = '<b>[IMPORTANT]</b> The plugin ID wikistyle2html, has been renamed to wikiformatstyling.  The support of wikistyle2html will be discontinued.  Please install wikiformatstyling plugin, then delete wikistyle2html plugin!';
        if (auth_ismanager()) msg($message);
    }

}
