import pool from '../../infrastructure/database/db.connection.js';

/* ===============================
   ADD PARTICIPANT
================================ */
const addParticipant = async (req, res) => {
  const userId = req.user.userId;
  const { participantName } = req.body;

  if (!participantName) {
    return res.status(400).json({
      success: false,
      message: 'Participant name is required',
    });
  }

  try {
    const exists = await pool.query(
      `
      SELECT 1 FROM ledger.ledger
      WHERE user_id = $1 AND participant_name = $2
      `,
      [userId, participantName]
    );

    if (exists.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Participant already exists',
      });
    }

    await pool.query(
      `
      INSERT INTO ledger.ledger (user_id, participant_name)
      VALUES ($1, $2)
      `,
      [userId, participantName]
    );

    return res.status(201).json({
      success: true,
      message: 'Participant added successfully',
      participant: participantName,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add participant',
    });
  }
};

/* ===============================
   ADD AMOUNT
================================ */
const addAmount = async (req, res) => {
  const userId = req.user.userId;
  const { participantName, payer, amount } = req.body;

  if (!participantName || !payer || !amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'participantName, payer and valid amount are required',
    });
  }

  if (!['user', 'participant'].includes(payer)) {
    return res.status(400).json({
      success: false,
      message: 'payer must be either "user" or "participant"',
    });
  }

  try {
    const ledger = await pool.query(
      `
      SELECT * FROM ledger.ledger
      WHERE user_id = $1 AND participant_name = $2
      `,
      [userId, participantName]
    );

    if (ledger.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Ledger not found',
      });
    }

    if (payer === 'user') {
      await pool.query(
        `
        UPDATE ledger.ledger
        SET user_amount = user_amount + $1
        WHERE user_id = $2 AND participant_name = $3
        `,
        [amount, userId, participantName]
      );
    } else {
      await pool.query(
        `
        UPDATE ledger.ledger
        SET participant_amount = participant_amount + $1
        WHERE user_id = $2 AND participant_name = $3
        `,
        [amount, userId, participantName]
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Amount added successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add amount',
    });
  }
};

/* ===============================
   SPLIT / BALANCE
================================ */
const splitAmount = async (req, res) => {
  const userId = req.user.userId;
  const { participantName } = req.params;

  console.log(participantName);
  try {
    const ledger = await pool.query(
      `
      SELECT user_amount, participant_amount
      FROM ledger.ledger
      WHERE user_id = $1 AND participant_name = $2
      `,
      [userId, participantName]
    );

    if (ledger.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Ledger not found',
      });
    }

    const { user_amount, participant_amount } = ledger.rows[0];

    const total = Number(user_amount) + Number(participant_amount);
    const fairShare = total / 2;

    if (user_amount > fairShare) {
      return res.status(200).json({
        success: true,
        status: 'owed_to_user',
        amount: Number((user_amount - fairShare).toFixed(2)),
        message: `${participantName} owes you money`,
      });
    }

    if (participant_amount > fairShare) {
      return res.status(200).json({
        success: true,
        status: 'owed_by_user',
        amount: Number((participant_amount - fairShare).toFixed(2)),
        message: `You owe ${participantName}`,
      });
    }

    return res.status(200).json({
      success: true,
      status: 'settled',
      amount: 0,
      message: 'You are settled up',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate split',
    });
  }
};

const getParticipants = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'unauthorized',
    });
  }

  try {
    const participant = await pool.query(
      `SELECT * FROM ledger.ledger WHERE user_id = $1`,
      [user.userId]
    );

    if (participant.rows.length == 0) {
      return res.status(400).json({
        success: false,
        message: 'user not exists',
      });
    }
    const data = participant.rows[0];

    return res.status(200).json({
      success: true,
      message: 'participants fetched successfully',
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'failed to get participants',
      error: error.message,
    });
  }
};

export { addParticipant, addAmount, splitAmount, getParticipants };
