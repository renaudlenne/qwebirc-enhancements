
ui.WINDOW_STATUS = 1;
ui.WINDOW_QUERY = 2;
ui.WINDOW_CHANNEL = 4;
ui.WINDOW_CUSTOM = 8;
ui.WINDOW_CONNECT = 16;
ui.WINDOW_MESSAGES = 32;
ui.CUSTOM_CLIENT = "custom";

ui.HILIGHT_NONE = 0;
ui.HILIGHT_ACTIVITY = 1;
ui.HILIGHT_SPEECH = 2;
ui.HILIGHT_US = 3;
ui.MAXIMUM_LINES_PER_WINDOW = 1000;
ui.WINDOW_LASTLINE = ui.WINDOW_QUERY | ui.WINDOW_MESSAGES | ui.WINDOW_CHANNEL | ui.WINDOW_STATUS;

irc.PMODE_LIST = 0;
irc.PMODE_SET_UNSET = 1;
irc.PMODE_SET_ONLY = 2;
irc.PMODE_REGULAR_MODE = 3;


var BROUHAHA = '#brouhaha',
    CONNECTION_DETAILS = 'Connection details',
    STATUS = 'Status',
    OPTIONS = 'Options',


    BASE_WINDOWS = [BROUHAHA, CONNECTION_DETAILS, STATUS],
    CHANNEL_TYPES = [ui.WINDOW_CHANNEL, ui.WINDOW_QUERY],
    INPUT_TYPES = [ui.WINDOW_STATUS, ui.WINDOW_QUERY, ui.WINDOW_CHANNEL, ui.WINDOW_MESSAGES];

var OPED = "+",
    DEOPED = "-",
    OPSTATUS = "@",
    VOICESTATUS = "+";

irc.IRCLowercaseTable = [ /* x00-x07 */ '\x00', '\x01', '\x02', '\x03', '\x04', '\x05', '\x06', '\x07',
    /* x08-x0f */ '\x08', '\x09', '\x0a', '\x0b', '\x0c', '\x0d', '\x0e', '\x0f',
    /* x10-x17 */ '\x10', '\x11', '\x12', '\x13', '\x14', '\x15', '\x16', '\x17',
    /* x18-x1f */ '\x18', '\x19', '\x1a', '\x1b', '\x1c', '\x1d', '\x1e', '\x1f',
    /* ' '-x27 */ ' ', '!', '"', '#', '$', '%', '&', '\x27',
    /* '('-'/' */ '(', ')', '*', '+', ',', '-', '.', '/',
    /* '0'-'7' */ '0', '1', '2', '3', '4', '5', '6', '7',
    /* '8'-'?' */ '8', '9', ':', ';', '<', '=', '>', '?',
    /* '@'-'G' */ '@', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
    /* 'H'-'O' */ 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    /* 'P'-'W' */ 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
    /* 'X'-'_' */ 'x', 'y', 'z', '{', '|', '}', '~', '_',
    /* '`'-'g' */ '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
    /* 'h'-'o' */ 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    /* 'p'-'w' */ 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
    /* 'x'-x7f */ 'x', 'y', 'z', '{', '|', '}', '~', '\x7f',
    /* x80-x87 */ '\x80', '\x81', '\x82', '\x83', '\x84', '\x85', '\x86', '\x87',
    /* x88-x8f */ '\x88', '\x89', '\x8a', '\x8b', '\x8c', '\x8d', '\x8e', '\x8f',
    /* x90-x97 */ '\x90', '\x91', '\x92', '\x93', '\x94', '\x95', '\x96', '\x97',
    /* x98-x9f */ '\x98', '\x99', '\x9a', '\x9b', '\x9c', '\x9d', '\x9e', '\x9f',
    /* xa0-xa7 */ '\xa0', '\xa1', '\xa2', '\xa3', '\xa4', '\xa5', '\xa6', '\xa7',
    /* xa8-xaf */ '\xa8', '\xa9', '\xaa', '\xab', '\xac', '\xad', '\xae', '\xaf',
    /* xb0-xb7 */ '\xb0', '\xb1', '\xb2', '\xb3', '\xb4', '\xb5', '\xb6', '\xb7',
    /* xb8-xbf */ '\xb8', '\xb9', '\xba', '\xbb', '\xbc', '\xbd', '\xbe', '\xbf',
    /* xc0-xc7 */ '\xe0', '\xe1', '\xe2', '\xe3', '\xe4', '\xe5', '\xe6', '\xe7',
    /* xc8-xcf */ '\xe8', '\xe9', '\xea', '\xeb', '\xec', '\xed', '\xee', '\xef',
    /* xd0-xd7 */ '\xf0', '\xf1', '\xf2', '\xf3', '\xf4', '\xf5', '\xf6', '\xd7',
    /* xd8-xdf */ '\xf8', '\xf9', '\xfa', '\xfb', '\xfc', '\xfd', '\xfe', '\xdf',
    /* xe0-xe7 */ '\xe0', '\xe1', '\xe2', '\xe3', '\xe4', '\xe5', '\xe6', '\xe7',
    /* xe8-xef */ '\xe8', '\xe9', '\xea', '\xeb', '\xec', '\xed', '\xee', '\xef',
    /* xf0-xf7 */ '\xf0', '\xf1', '\xf2', '\xf3', '\xf4', '\xf5', '\xf6', '\xf7',
    /* xf8-xff */ '\xf8', '\xf9', '\xfa', '\xfb', '\xfc', '\xfd', '\xfe', '\xff'];


ui.themes.ThemeControlCodeMap = {
    "C": "\x03",
    "B": "\x02",
    "U": "\x1F",
    "O": "\x0F",
    "{": "\x00",
    "}": "\x00",
    "[": "qwebirc://whois/",
    "]": "/",
    "$": "$"
};

ui.themes.Default = {
    "PREFIX": ["$C4==$O "],
    "SIGNON": ["Signed on!", true],
    "CONNECT": ["Connected to server.", true],
    "RAW": ["$m", true],
    "DISCONNECT": ["Disconnected from server: $m", true],
    "ERROR": ["ERROR: $m", true],
    "SERVERNOTICE": ["$m", true],
    "JOIN": ["${$N$} [$h] has joined $c", true],
    "OURJOIN": ["${$N$} [$h] has joined $c", true],
    "PART": ["${$N$} [$h] has left $c [$m]", true],
    "KICK": ["${$v$} was kicked from $c by ${$N$} [$m]", true],
    "MODE": ["mode/$c [$m] by ${$N$}", true],
    "QUIT": ["${$N$} [$h] has quit [$m]", true],
    "NICK": ["${$n$} has changed nick to ${$[$w$]$}", true],
    "TOPIC": ["${$N$} changed the topic of $c to: $m", true],
    "UMODE": ["Usermode change: $m", true],
    "INVITE": ["$N invites you to join $c", true],
    "HILIGHT": ["$C4"],
    "HILIGHTEND": ["$O"],
    "CHANMSG": ["<${$@$($N$)$}> $m"],
    "PRIVMSG": ["<$($N$)> $m"],
    "CHANNOTICE": ["-${$($N$)$}:$c- $m"],
    "PRIVNOTICE": ["-$($N$)- $m"],
    "OURCHANMSG": ["<$@$N> $m"],
    "OURPRIVMSG": ["<$N> $m"],
    "OURTARGETEDMSG": ["*$[$t$]* $m"],
    "OURTARGETEDNOTICE": ["[notice($[$t$])] $m"],
    "OURCHANNOTICE": ["-$N:$t- $m"],
    "OURPRIVNOTICE": ["-$N- $m"],
    "OURCHANACTION": [" * $N $m"],
    "OURPRIVACTION": [" * $N $m"],
    "CHANACTION": [" * ${$($N$)$} $m"],
    "PRIVACTION": [" * $($N$) $m"],
    "CHANCTCP": ["$N [$h] requested CTCP $x from $c: $m"],
    "PRIVCTCP": ["$N [$h] requested CTCP $x from $-: $m"],
    "CTCPREPLY": ["CTCP $x reply from $N: $m"],
    "OURCHANCTCP": ["[ctcp($t)] $x $m"],
    "OURPRIVCTCP": ["[ctcp($t)] $x $m"],
    "OURTARGETEDCTCP": ["[ctcp($t)] $x $m"],
    "WHOISUSER": ["$B$N$B [$h]", true],
    "WHOISREALNAME": [" realname : $m", true],
    "WHOISCHANNELS": [" channels : $m", true],
    "WHOISSERVER": [" server   : $x [$m]", true],
    "WHOISACCOUNT": [" account  : qwebirc://qwhois/$m", true],
    "WHOISIDLE": [" idle     : $x [connected: $m]", true],
    "WHOISAWAY": [" away     : $m", true],
    "WHOISOPER": ["          : $BIRC Operator$B", true],
    "WHOISOPERNAME": [" operedas : $m", true],
    "WHOISACTUALLY": [" realhost : $m [ip: $x]", true],
    "WHOISGENERICTEXT": ["          : $m", true],
    "WHOISEND": ["End of WHOIS", true],
    "AWAY": ["$N is away: $m", true],
    "GENERICERROR": ["$m: $t", true],
    "GENERICMESSAGE": ["$m", true],
    "WALLOPS": ["WALLOP $n: $t", true],
    "CHANNELCREATIONTIME": ["Channel $c was created at: $m", true],
    "CHANNELMODEIS": ["Channel modes on $c are: $m", true]
};

ui.UI_COMMANDS = [
    ["Options", "options"],
    ["Add webchat to your site", "embedded"],
    ["Privacy policy", "privacy"],
    ["Feedback", "feedback"],
    ["Frequently asked questions", "faq"],
    ["About qwebirc", "about"]
];


irc.Numerics = {
    "001": "RPL_WELCOME",
    "433": "ERR_NICKNAMEINUSE",
    "004": "RPL_MYINFO",
    "005": "RPL_ISUPPORT",
    "353": "RPL_NAMREPLY",
    "366": "RPL_ENDOFNAMES",
    "331": "RPL_NOTOPIC",
    "332": "RPL_TOPIC",
    "333": "RPL_TOPICWHOTIME",
    "311": "RPL_WHOISUSER",
    "312": "RPL_WHOISSERVER",
    "313": "RPL_WHOISOPERATOR",
    "317": "RPL_WHOISIDLE",
    "671": "RPL_WHOISSECURE",
    "318": "RPL_ENDOFWHOIS",
    "319": "RPL_WHOISCHANNELS",
    "330": "RPL_WHOISACCOUNT",
    "338": "RPL_WHOISACTUALLY",
    "343": "RPL_WHOISOPERNAME",
    "320": "RPL_WHOISGENERICTEXT",
    "325": "RPL_WHOISWEBIRC",
    "301": "RPL_AWAY",
    "401": "ERR_NOSUCHNICK",
    "404": "ERR_CANNOTSENDTOCHAN",
    "482": "ERR_CHANOPPRIVSNEEDED",
    "305": "RPL_UNAWAY",
    "306": "RPL_NOWAWAY",
    "324": "RPL_CHANNELMODEIS",
    "329": "RPL_CREATIONTIME"
};
