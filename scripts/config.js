export default {
    defaults: {
        chatformat: `{{is_afk "§7AFK "}}{{clan "<bc>[§r§7<nc>[@CLAN]§r<bc>] "}}{{has_tag staffchat "<bc>[<nc> StaffChat §r<bc>] " "<bl>"}}§r<bc>[ <rc>{{rank_joiner "<drj>"}}§r<bc> ] §r<nc><name> §r§l<bc><dra> §r<mc><msg>`
    },
    tableNames: {
        uis: "uis"
    },
    scripteventNames: {
        open: "leaf:open",
        openDefaultLegacy: "leaf:open_default",
        openDefault: "leafgui:",
    },
    uiNames: {
        Crates: {
            Root: "crates_root | Leaf/Crates/Root"
        },
        UIBuilderRoot: "ui_builder_main_page | Leaf/UIBuilder/Root",
        UIBuilderAdd: "ui_builder_create_ui | Leaf/UIBuilder/Add",
        UIBuilderSearch: "ui_builder_search_uis | Leaf/UIBuilder/Search",
        UIBuilderEdit: "ui_builder_edit_ui | Leaf/UIBuilder/Edit",
        UIBuilderEditButtons: "ui_builder_edit_buttons | Leaf/UIBuilder/EditButtons",
        UIBuilderAddButton: "ui_builder_add_button | Leaf/UIBuilder/AddButton",
        UIBuilderEditButton: "ui_builder_edit_button | Leaf/UIBuilder/EditButton",
        UIBuilderTemplates: "ui_builder_templates | Leaf/UIBuilder/Templates",
        UIBuilderTemplatesAdd: "ui_builder_templates_add | Leaf/UIBuilder/Templates/Add",
        UIBuilderInfo: "ui_builder_info | Leaf/UIBuilder/Info",
        UIBuilderTabbed: "ui_builder_tabbed | Leaf/UIBuilder/Tabbed",
        UIBuilderTabbedCreate: "ui_builder_tabbed_create | Leaf/UIBuilder/Tabbed/Create",
        UIBuilderTabbedEdit: "ui_builder_tabbed_edit | Leaf/UIBuilder/Tabbed/Edit",
        UIBuilderTabbedEditTabs: "ui_builder_tabbed_edit_tabs | Leaf/UIBuilder/Tabbed/EditTabs",
        ConfigRoot: "config_menu_start_page | Leaf/Config/Root",
        ConfigMain: "config_menu_main_settings | Leaf/Config/Main",
        Config: {
            Clans: "clans_config | Leaf/Config/Clans",
            Modules: "modules_config | Leaf/Config/Modules",
            Misc: "misc_config | Leaf/Config/Misc",
            ChatrankFormat: "chatformat_config | Leaf/Config/Misc/Chatrankformat",
            Advanced: "advanced_config | Leaf/Config/Advanced"
        },
        PlayerContentManager: {
            Root: "pcm_root",
            Add: "pcm_add",
            Edit: "pcm_edit",
            Moderate: "pcm_moderate"
        },
        ConfigCredits: "credits | Leaf/Config/Credits",
        ChestGuiRoot: "chest_gui_main_page | Leaf/ChestGUIs/Root",
        ChestGuiAdd: "chest_gui_create_ui | Leaf/ChestGUIs/Add",
        ChestGuiAddAdvanced: "chest_gui_create_advanced_ui | Leaf/ChestGUIs/Add/Advanced",
        ChestGuiEdit: "chest_gui_edit_ui | Leaf/ChestGUIs/Edit",
        ChestGuiEditItems: "chest_gui_edit_items | Leaf/ChestGUIs/EditItems",
        ChestGuiEditItem: "chest_gui_edit_item | Leaf/ChestGUIs/EditItem",
        ChestGuiAddItem: "chest_gui_add_item | Leaf/ChestGUIs/AddItem",
        ChestGuiAddItemAdvanced: "chest_gui_add_advanced_item | Leaf/ChestGUIs/AddItem/Advanced",
        OnlineGUIsList: "ln/online_guis_list | LeafNetwork/OnlineGUIs/List",
        SidebarEditorRoot: "sidebar_editor_root | Leaf/Sidebar/Root",
        SidebarEditorAdd: "sidebar_editor_create | Leaf/Sidebar/Add",
        SidebarEditorSettings: "sidebar_editor_global_settings | Leaf/Sidebar/Settings",
        SidebarEditorEdit: "sidebar_editor_edit | Leaf/Sidebar/Edit",
        SidebarEditorAddLine: "sidebar_editor_add_line | Leaf/Sidebar/AddLine",
        SidebarEditorEditLine: "sidebar_editor_edit_line | Leaf/Sidebar/EditLine",
        SidebarEditorTrash: "sidebar_editor_trash | Leaf/Sidebar/Trash",
        SidebarEditorTrashEdit: "sidebar_editor_trash_edit | Leaf/Sidebar/TrashEdit",
        BlockEditor: "block_editor | Leaf/BlockEditor",
        EntityEditor: "entity_editor | Leaf/EntityEditor",
        CurrencyEditor: "currency_editor | Leaf/CurrencyEditor/Root",
        CurrencyEditorAdd: "add_currency | Leaf/CurrencyEditor/Add",
        IconViewer: "icon_viewer | Leaf/IconViewer",
        PlayerShops: {
            Root: "player_shop_root | Leaf/PlayerShops/Root",
            View: "player_shop_view | Leaf/PlayerShops/View",
            Leaderboard: "player_shop_leaderboard | Leaf/PlayerShops/Leaderboard",
            LeaderboardSubmenus: {
                MostSales: "player_shop_most_sales | Leaf/PlayerShops/Leaderboard/MostSales",
                MostMoneyMade: "player_shop_most_money_made | Leaf/PlayerShops/Leaderboard/MostMoneyMade"
            }
        },
        Help: "help_ui | Leaf/Help",
        Generator: {
            Create: "create_generator | Leaf/Generator/Create",
            EditRoot: "edit_generators | Leaf/Generator/Edit/Root",
            EditGenerator: "edit_generator | Leaf/Generator/Edit/Properties",
            EditGeneratorSettings: "edit_generator_settings | Leaf/Generator/Edit/Properties/Settings",
            EditGeneratorUpgrades: "edit_generator_upgrades | Leaf/Generator/Edit/Properties/Upgrades",
        },
        DailyRewards: {
            AddReward: "add_daily_reward | Leaf/DailyRewards/AddReward",
            Claim: "claim_daily_reward | Leaf/DailyRewards/Claim",
            ClaimWeekly: "claim_weekly_reward | Leaf/DailyRewards/ClaimWeekly",
            ClaimMonthly: "claim_monthly_reward | Leaf/DailyRewards/ClaimMonthly",
            EditReward: "edit_daily_reward | Leaf/DailyRewards/EditReward",
            Root: "edit_daily_rewards | Leaf/DailyRewards/Root",
            Rewards: "view_daily_rewards | Leaf/DailyRewards/Rewards"
        },
        Clans: {
            Root: "clans_root | Leaf/Clans/Root",
            Create: "create_clan | Leaf/Clans/Create",
            Invite: "invite_to_clan | Leaf/Clans/Invite",
            ViewInvites: "view_clan_invites | Leaf/Clan/Invites",
            ClanMembers: "manage_clan_members | Leaf/Clan/Manage"
        },
        Gifts: {
            Add: "create_gift_code | Leaf/Gifts/Add",
            Redeem: "redeem_gift_code | Leaf/Gifts/Redeem",
            Edit: "edit_gift_code | Leaf/Gifts/Edit",
            Root: "edit_gift_codes | Leaf/Gifts/Root"
        },
        Shop: {
            Root: "shop_main | Leaf/Shop/Root",
            Category: "shop_category | Leaf/Shop/Root/Category",
            RootAdmin: "shop_admin | Leaf/Shop/Root/Admin",
            CategoryAdmin: "shop_category_admin | Leaf/Shop/Root/Category/Admin",
            ItemAdmin: "shop_edit_item | Leaf/Shop/Root/Admin/Item"
        },
        KillEvents: {
            KillEventsRoot: "kill_events_root | Leaf/KillEvents/Root",
            KillEventsAdd: "kill_events_add | Leaf/KillEvents/Add"
        },
        Events: {
            EventsRoot: "events_editor_root | Leaf/Events/Root",
            EventsEdit: "events_editor_edit | Leaf/Events/Edit",
            EventsAdd: "events_editor_add | Leaf/Events/Add",
            EventsEditCommands: "events_editor_commands | Leaf/Events/Commands/Edit",
            EventsEditCommand: "events_editor_command | Leaf/Events/Command/Edit"
        },
        Pay: "pay | Leaf/Pay",
        Basic: {
            Confirmation: "confirmation | Leaf/Basic/Confirmation",
            ItemSelect: "item_select | Leaf/Basic/ItemSelect",
            NumberSelector: "number_select | Leaf/Basic/Number"
        },
        Homes: {
            Root: "homes | Leaf/Homes/Root"
        }
    },
    Discord: {
        AvatarURL: "https://i.ibb.co/Sx1cF3h/c9268706406510b05e280005280a86ef.png",
        Username: "Leaf Essentials"
    },
    HTTPEnabled: true,
    Endpoint: "http://localhost:3004",
    items: {
        LeafConfig: "leaf:config_ui"
    }
}